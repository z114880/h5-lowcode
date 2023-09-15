import React, { FC, useCallback, useContext, useState } from 'react'
import ButtonItem from './ButtonItem'
import {
  UndoOutlined,
  RedoOutlined,
  DeleteOutlined,
  MobileOutlined,
  CloudServerOutlined,
  UpSquareOutlined,
  DownSquareOutlined,
  UploadOutlined,
  DownloadOutlined,
  CodeOutlined,
  GlobalOutlined
} from '@ant-design/icons'
import useHandleDelete from '@/editor/hooks/useHandleDelete'
import useHandleZIndex from '@/editor/hooks/useHandleZIndex'
import useSteps from '@/editor/hooks/useSteps'
import { SchemaContext } from '@/utils/context'
import { generate, deploy } from '@lowcode-packages/code-generator'
import {
  Modal,
  Input,
  message,
  Button,
  Form,
  Avatar,
  Dropdown,
  MenuProps,
  Popconfirm,
  QRCode,
  Popover
} from 'antd'
import { pageConfigType } from '@/editor/types'
import { useNavigate } from 'react-router-dom'
import { uploadApi } from '@/apis'
import Album from './Album'
import { useTranslation } from 'react-i18next'

const { TextArea } = Input
const Header: FC = () => {
  const { state, dispatch } = useContext(SchemaContext)
  const { pageConfig, schema, focusing } = state
  const { isActive, onDelete } = useHandleDelete(schema, dispatch, focusing)
  const {
    isActive: isActiveOnZIndex,
    onAddZIndex,
    onMinusZIndex
  } = useHandleZIndex(schema, dispatch, focusing)
  const { redo, undo, enableRedo, enableUndo } = useSteps()

  const onDownload = useCallback(() => {
    console.log(schema)
    generate(schema, pageConfig)
  }, [schema, pageConfig])

  const [open, setOpen] = useState<boolean>(false)
  const [importedSchema, setImportedSchema] = useState<string>('')

  const handleCancel = () => {
    setOpen(false)
  }
  const onOpen = useCallback(() => {
    return setOpen(true)
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImportedSchema(e.target.value)
  }
  const onExportSchema = useCallback(() => {
    const Json = JSON.stringify({ schema, config: pageConfig })
    const eleLink = document.createElement('a')
    eleLink.download = 'JSON.txt'
    eleLink.style.display = 'none'
    // 字符内容转变成blob地址
    const blob = new Blob([Json])
    eleLink.href = URL.createObjectURL(blob)
    // 触发点击
    document.body.appendChild(eleLink)
    eleLink.click()
    // 然后移除
    document.body.removeChild(eleLink)
  }, [schema, pageConfig])

  const onPreview = useCallback(() => {
    window.open('/preview.html')
  }, [])

  const [settingOpen, setSettingOpen] = useState(false)
  const [config, setConfig] = useState(pageConfig)

  const [form] = Form.useForm()
  const handleSettingOk = async () => {
    form.submit()
  }
  const cancleSettingOk = () => {
    setSettingOpen(false)
  }
  const onSettingOpen = () => {
    setSettingOpen(true)
  }
  const onFinish = () => {
    dispatch({
      type: 'setPageConfig',
      payload: config
    })
    setSettingOpen(false)
  }
  const handleChangeConfig = (name: keyof pageConfigType) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfig({
        ...config,
        [name]: e.target.value
      })
    }
  }
  const handleOk = () => {
    try {
      const newSchema = JSON.parse(importedSchema).schema
      const newConfig = JSON.parse(importedSchema).config
      //@todo 校验JSON
      dispatch({
        type: 'setSchema',
        payload: newSchema
      })
      dispatch({
        type: 'pushQueue',
        payload: newSchema
      })
      setConfig(newConfig)
      form.setFieldsValue(newConfig)
      dispatch({
        type: 'setPageConfig',
        payload: newConfig
      })
    } catch (e) {
      console.log(e)
    }
    setOpen(false)
  }
  const getAvatar = () => {
    if (typeof localStorage.getItem('avatar') === 'string') {
      return localStorage.getItem('avatar')!
    }
    return ''
  }
  const getName = () => {
    if (typeof localStorage.getItem('name') === 'string') {
      return localStorage.getItem('name')!
    }
    return ''
  }
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('name')
    localStorage.removeItem('avatar')
    navigate('/login')
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <div onClick={logout}>退出登录</div>
    }
  ]

  const [qrCode, setQrCode] = useState('')
  const deployEvent = async () => {
    const file = await deploy(schema, pageConfig)
    if (pageConfig.projectName) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folderName', pageConfig.projectName)
      formData.append('operatorId', '1')
      formData.append('type', 'zip')
      try {
        const res = await uploadApi(formData)
        if (res.status === 201) {
          message.success('部署成功')
          setQrCode(`https://www.funet.top/pages/${pageConfig.projectName}/index.html`)
        } else {
          message.error('部署失败，请重试')
        }
      } catch (error: any) {
        message.error('部署失败，请重试')
      }
    } else if (!pageConfig.projectName) {
      message.warning('请补全项目名称')
    }
  }
  const copyLink = async () => {
    try {
      //clipboard Api只能在https或者localhost中调用
      await navigator.clipboard.writeText(qrCode)
      message.success('已拷贝至剪切板')
    } catch (e) {
      console.log(e)
      message.error('只能在https或者localhost中调用')
    }
  }

  const [isOpenAlbum, setIsOpenAlbum] = useState(false)
  const openAlbum = () => {
    if (pageConfig.projectName) setIsOpenAlbum(true)
    else message.warning('请补全项目名称')
  }
  const closeAlbum = useCallback(() => {
    setIsOpenAlbum(false)
  }, [])

  const { t, i18n } = useTranslation()

  const i18nMenuItems: MenuProps['items'] = [
    {
      label: <div onClick={() => i18n.changeLanguage('en')}>English</div>,
      key: 'en'
    },
    {
      label: <div onClick={() => i18n.changeLanguage('zh')}>中文</div>,
      key: 'zh'
    }
  ]

  return (
    <header className="h-[80px] flex bg-white drop-shadow justify-between">
      <Modal open={open} onOk={handleOk} onCancel={handleCancel} closable={false}>
        <TextArea
          placeholder="Please input schema!"
          style={{ height: 520 }}
          allowClear
          onChange={onChange}
        />
      </Modal>
      <Modal
        forceRender
        open={settingOpen}
        onOk={handleSettingOk}
        onCancel={cancleSettingOk}
        closable={false}
      >
        <Form
          className="mt-4"
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          initialValues={config}
        >
          <Form.Item
            label="项目名称"
            name="projectName"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input onChange={handleChangeConfig('projectName')} />
          </Form.Item>
          <Form.Item label="标题名称" name="title" rules={[{ message: '请输入标题名称' }]}>
            <Input onChange={handleChangeConfig('title')} />
          </Form.Item>
          <Form.Item label="分享标题" name="sharedTitle" rules={[{ message: '请输入分享标题' }]}>
            <Input onChange={handleChangeConfig('sharedTitle')} />
          </Form.Item>
          <Form.Item label="分享摘要" name="sharedMessage" rules={[{ message: '请输入分享摘要' }]}>
            <Input onChange={handleChangeConfig('sharedMessage')} />
          </Form.Item>
          <Form.Item label="分享Logo" name="sharedLogo" rules={[{ message: '请输入分享Logo' }]}>
            <Input onChange={handleChangeConfig('sharedLogo')} />
          </Form.Item>
        </Form>
      </Modal>
      <div className="w-[1000px] ml-[400px] pr-4 flex items-center justify-between">
        <ButtonItem actived={enableUndo} event={undo} icon={<UndoOutlined />} name="撤销" />
        <ButtonItem actived={enableRedo} event={redo} icon={<RedoOutlined />} name="恢复" />
        <ButtonItem actived={isActive} event={onDelete} icon={<DeleteOutlined />} name="删除" />
        <ButtonItem
          actived={isActiveOnZIndex}
          event={onAddZIndex}
          icon={<UpSquareOutlined />}
          name="上移一层"
        />
        <ButtonItem
          actived={isActiveOnZIndex}
          event={onMinusZIndex}
          icon={<DownSquareOutlined />}
          name="下移一层"
        />
        <ButtonItem icon={<UploadOutlined />} event={onExportSchema} name="导出JSON" />
        <ButtonItem icon={<DownloadOutlined />} event={onOpen} name="导入JSON" />
        <ButtonItem event={onDownload} icon={<CodeOutlined />} name="下载代码" />
        <ButtonItem event={onPreview} icon={<MobileOutlined />} name="预览" />
        <Popconfirm
          placement="bottom"
          title="确定要部署吗？"
          description="此操作会覆盖当前线上项目"
          onConfirm={deployEvent}
          okText="是"
          cancelText="否"
        >
          <>
            <ButtonItem icon={<CloudServerOutlined />} name="部署" />
          </>
        </Popconfirm>
        {qrCode && (
          <Popover
            overlayInnerStyle={{ padding: 0 }}
            content={<QRCode value={qrCode} bordered={false} />}
          >
            <div className="cursor-pointer">
              <QRCode value={qrCode} size={76} />
            </div>
          </Popover>
        )}
        {qrCode && (
          <Button type="primary" onClick={copyLink}>
            复制链接
          </Button>
        )}

        <div className="flex items-center">
          <Button type="primary" onClick={onSettingOpen}>
            {t('header.setting')}
          </Button>
        </div>
        <div className="flex items-center">
          <Album isOpen={isOpenAlbum} closeAlbum={closeAlbum} />
          <Button type="primary" onClick={openAlbum}>
            图片库
          </Button>
        </div>
      </div>

      <div className="flex h-full items-center mr-10 pl-4 pr-4">
        <Dropdown menu={{ items: i18nMenuItems }} placement="bottom" arrow>
          <div className="h-8 cursor-pointer pl-2 pr-2 rounded-md mr-2">
            <GlobalOutlined />
          </div>
        </Dropdown>
        <Dropdown menu={{ items }} placement="bottom" arrow>
          <div className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md">
            <Avatar src={<img src={getAvatar()} alt="avatar" />} />
            <div className="ml-2 min-w-[48px] text-gray-600 text-[15px]">{getName()}</div>
          </div>
        </Dropdown>
      </div>
    </header>
  )
}
export default Header
