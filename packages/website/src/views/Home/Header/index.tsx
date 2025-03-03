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
import Editor from './Editor'
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
  const { t, i18n } = useTranslation()

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
      label: <div onClick={logout}>{t('header.logout')}</div>
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
          message.success(t('header.deploySuccess'))
          setQrCode(`https://www.funet.top/pages/${pageConfig.projectName}/index.html`)
        } else {
          message.error(t('header.deployFailed'))
        }
      } catch (error: any) {
        message.error(t('header.deployFailed'))
      }
    } else if (!pageConfig.projectName) {
      message.warning(t('header.completeProjectName'))
    }
  }
  const copyLink = async () => {
    try {
      //clipboard Api只能在https或者localhost中调用
      await navigator.clipboard.writeText(qrCode)
      message.success(t('header.copiedToClipboard'))
    } catch (e) {
      console.log(e)
      message.error(t('header.httpsLocalhostOnly'))
    }
  }

  const [isOpenAlbum, setIsOpenAlbum] = useState(false)
  const openAlbum = () => {
    if (pageConfig.projectName) setIsOpenAlbum(true)
    else message.warning(t('header.completeProjectName'))
  }
  const closeAlbum = useCallback(() => {
    setIsOpenAlbum(false)
  }, [])

  const [isOpenEditor, setIsOpenEditor] = useState(false)
  const openEditor = () => {
    if (pageConfig.projectName) setIsOpenEditor(true)
    else message.warning(t('header.completeProjectName'))
  }
  const closeEditor = useCallback(() => {
    setIsOpenEditor(false)
  }, [])

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
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={config}
        >
          <Form.Item
            label={t('header.projectName')}
            name="projectName"
            rules={[{ required: true, message: t('header.inputProjectName') }]}
          >
            <Input onChange={handleChangeConfig('projectName')} />
          </Form.Item>
          <Form.Item
            label={t('header.shareTitle')}
            name="title"
            rules={[{ message: t('header.shareTitle') }]}
          >
            <Input onChange={handleChangeConfig('title')} />
          </Form.Item>
          <Form.Item
            label={t('header.shareTitle')}
            name="sharedTitle"
            rules={[{ message: t('header.inputShareTitle') }]}
          >
            <Input onChange={handleChangeConfig('sharedTitle')} />
          </Form.Item>
          <Form.Item
            label={t('header.shareMessage')}
            name="sharedMessage"
            rules={[{ message: t('header.inputShareMessage') }]}
          >
            <Input onChange={handleChangeConfig('sharedMessage')} />
          </Form.Item>
          <Form.Item
            label={t('header.shareLogo')}
            name="sharedLogo"
            rules={[{ message: t('header.inputShareLogo') }]}
          >
            <Input onChange={handleChangeConfig('sharedLogo')} />
          </Form.Item>
        </Form>
      </Modal>
      <div className="w-[1000px] ml-[400px] pr-4 flex items-center justify-between">
        <ButtonItem
          actived={enableUndo}
          event={undo}
          icon={<UndoOutlined />}
          name={t('header.undo')}
        />
        <ButtonItem
          actived={enableRedo}
          event={redo}
          icon={<RedoOutlined />}
          name={t('header.redo')}
        />
        <ButtonItem
          actived={isActive}
          event={onDelete}
          icon={<DeleteOutlined />}
          name={t('header.delete')}
        />
        <ButtonItem
          actived={isActiveOnZIndex}
          event={onAddZIndex}
          icon={<UpSquareOutlined />}
          name={t('header.increaseZIndex')}
        />
        <ButtonItem
          actived={isActiveOnZIndex}
          event={onMinusZIndex}
          icon={<DownSquareOutlined />}
          name={t('header.decreaseZIndex')}
        />
        <ButtonItem
          icon={<UploadOutlined />}
          event={onExportSchema}
          name={t('header.exportJson')}
        />
        <ButtonItem icon={<DownloadOutlined />} event={onOpen} name={t('header.importJson')} />
        <ButtonItem event={onDownload} icon={<CodeOutlined />} name={t('header.downloadProject')} />
        <ButtonItem event={onPreview} icon={<MobileOutlined />} name={t('header.preview')} />
        <Popconfirm
          placement="bottom"
          title={t('header.makeSureDeploy')}
          description={t('header.overwriteProductionProject')}
          onConfirm={deployEvent}
          okText={t('header.yes')}
          cancelText={t('header.no')}
        >
          <>
            <ButtonItem icon={<CloudServerOutlined />} name={t('header.deploy')} />
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
            {t('header.copyLink')}
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
            {t('header.album')}
          </Button>
        </div>
        <div className="flex items-center">
          <Editor isOpen={isOpenEditor} closeEditor={closeEditor} />
          <Button type="primary" onClick={openEditor}>
            {t('header.editor')}
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
