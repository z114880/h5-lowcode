import { FC, useContext, useState } from 'react'
import { SchemaContext } from '@/utils/context'
import { DeleteOutlined } from '@ant-design/icons'
import { containerType } from '@/editor/types'
import { Button, Modal, Input, Form, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import deepcopy from 'deepcopy'
import { registerConfig } from '@/components/EditableMaterial'
import { MaterialItemsKeys } from '@/editor/types'
import { dialogReg } from '@/utils/tools'
import { deleteElementByIndexes } from '@/editor/utils/tools'

const EditorPages: FC = () => {
  const { state, dispatch } = useContext(SchemaContext)

  const [open, setOpen] = useState<boolean>(false)
  const [form] = useForm()

  const handleOpenDialog = () => {
    setOpen(true)
  }
  const handleOk = () => {
    form.submit()
  }
  const handleCancel = () => {
    setOpen(false)
  }
  const onFinish = (data: { dialogType: MaterialItemsKeys; dialogName: string }) => {
    const { dialogType, dialogName } = data
    const newSchema = deepcopy(state.schema)
    const postion = registerConfig.componentMap[dialogType].position
    const blocks = registerConfig.componentMap[dialogType].blocks!
    const props = registerConfig.componentMap[dialogType].props
    const event = registerConfig.componentMap[dialogType].event
    const animation = registerConfig.componentMap[dialogType].animation

    newSchema.container.push({
      key: dialogType,
      name: dialogName,
      //此处dialog做特殊处理，添加top，height属性
      position: { ...postion, top: 0, height: '100vh' },
      props: props,
      event: event,
      animation: animation,
      blocks: blocks
    })
    dispatch({
      type: 'setSchema',
      payload: newSchema
    })
    dispatch({
      type: 'pushQueue',
      payload: newSchema
    })
    form.resetFields()
    setOpen(false)
  }

  const setCurrentDialog = (containerIndex: number) => {
    return () => {
      dispatch({
        type: 'setCurrentEditor',
        payload: {
          current: 'dialog',
          containerIndex
        }
      })
    }
  }
  const onDelete = (containerIndex: number) => {
    return () => {
      const newSchema = deepcopy(state.schema)
      const deletedSchema = deleteElementByIndexes(newSchema, containerIndex, [])
      if (state.focusing?.containerIndex === containerIndex) {
        dispatch({
          type: 'setFocusing',
          payload: null
        })
      }
      dispatch({
        type: 'setSchema',
        payload: deletedSchema
      })
      dispatch({
        type: 'pushQueue',
        payload: deletedSchema
      })
    }
  }
  return (
    <div className="h-[160px] overflow-y-scroll">
      <Button onClick={handleOpenDialog} className="mt-2 mb-2 ml-2 ml-6" type="primary">
        +&nbsp;创建弹窗
      </Button>
      <Modal title="新增弹窗" open={open} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            name="dialogType"
            label="弹窗类型"
            rules={[{ required: true, message: '请选择弹窗类型!' }]}
          >
            <Select>
              <Select.Option value="dialog">自定义弹窗</Select.Option>
              <Select.Option value="infoDialog">活动说明弹窗</Select.Option>
              <Select.Option value="virtualGoodsDialog">虚拟物品中奖弹窗</Select.Option>
              <Select.Option value="realGoodsDialog">实物物品中奖弹窗</Select.Option>
              <Select.Option value="prizeDialog">我的奖品弹窗</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dialogName"
            label="弹窗名称"
            rules={[
              {
                required: true,
                message: '请输入弹窗名称!'
              },
              () => ({
                validator(_, value) {
                  const dialogs: string[] = []
                  state.schema.container.forEach((val) => {
                    if (dialogReg.test(val.key)) {
                      dialogs.push(val.name!)
                    }
                  })
                  //收集所有的弹窗名称，并比较
                  if (value && !dialogs.includes(value)) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('弹窗名称须是唯一值!'))
                }
              })
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {state.schema.container.map((val: containerType, ind: number) => {
        if (dialogReg.test(val.key)) {
          return (
            <div
              className="w-[full] cursor-pointer h-8 leading-6 pl-3 pr-3 hover:bg-gray-100 flex justify-between items-center text-gray-600 pl-7"
              style={{
                background:
                  state.currentEditor.current === 'dialog' &&
                  state.currentEditor.containerIndex === ind
                    ? 'rgb(219, 234, 254)'
                    : ''
              }}
              key={ind}
              onClick={setCurrentDialog(ind)}
            >
              <div>{val.name}</div>
              <DeleteOutlined onClick={onDelete(ind)} style={{ color: 'rgba(107, 114, 128, 1)' }} />
            </div>
          )
        }
      })}
    </div>
  )
}
export default EditorPages
