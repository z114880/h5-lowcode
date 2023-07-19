import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { SchemaContext } from '@/utils/context'
import { Input, Button, Modal, Select, message } from 'antd'
import deepcopy from 'deepcopy'
import { getBlockElementByIndexes } from '@/editor/utils/tools'
import { getAttrValue, dialogReg, isRegNumber } from '@/utils/tools'
import { getKeyElementByBlocks } from '@/editor/utils/tools'
import { registerConfig } from '@/components/EditableMaterial'
import { MaterialItemsKeys } from '@/editor/types'
import eventMap from '@/editor/utils/eventMap'
import attributeMap from '@/editor/utils/attributeMap'
import cssOption from './cssOption'
import TabLayoutProps from './TabLayoutProps'

type optionType = {
  label: string
  value:
    | string
    | {
        type: string
        value: string
      }
}
const TabProps: FC<{ size: { width?: number; height?: number; left?: number; top?: number } }> = (
  props
) => {
  const { state, dispatch } = useContext(SchemaContext)
  const { focusing, schema } = state

  const getFocusEle = () => {
    if (focusing) {
      if (focusing.blockIndex.length > 0) {
        const element = getBlockElementByIndexes(
          schema,
          focusing.containerIndex,
          focusing.blockIndex
        )
        if (element === 'notFound') {
          return null
        }
        return element
      } else {
        return schema.container[focusing.containerIndex]
      }
    }
    return null
  }

  const element = getFocusEle()
  const [size, setSize] = useState({
    width: props.size?.width ? String(props.size.width) : null,
    height: props.size?.height ? String(props.size.height) : null,
    left: props.size?.left ? String(props.size.left) : null,
    top: props.size?.top ? String(props.size.top) : null
  })
  const [styleObj, setStyleObj] = useState<Record<string, any>>({})
  const [attrObj, setAttrObj] = useState<Record<string, any>>({})
  useEffect(() => {
    if (element) {
      setStyleObj(element.props.style)
      setAttrObj(element.props.attr)
    }
  }, [state.schema, element])
  useEffect(() => {
    setSize({
      width: props.size?.width ? String(props.size.width) : null,
      height: props.size?.height ? String(props.size.height) : null,
      left: props.size?.left ? String(props.size.left) : null,
      top: props.size?.top ? String(props.size.top) : null
    })
  }, [props.size])
  const onChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize({ ...size, width: e.target.value })
  }
  const onChageHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize({ ...size, height: e.target.value })
  }
  const onChangeLeft = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize({ ...size, left: e.target.value })
  }
  const onChangeTop = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize({ ...size, top: e.target.value })
  }
  const onChangeStyle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStyleObj({
      ...styleObj,
      [e.target.name]: isRegNumber(e.target.value) ? Number(e.target.value) : e.target.value
    })
  }
  const onChangeBackgroundImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStyleObj({
      ...styleObj,
      [e.target.name]: `url(${e.target.value})`
    })
  }
  const onChangeAttr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttrObj({
      ...attrObj,
      [e.target.name]: e.target.value
    })
  }
  const [show, setShow] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 100)
  }, [])

  const [open, setOpen] = useState(false)
  const [action, setAction] = useState(element?.event?.action)
  const [param, setParam] = useState(element?.event?.param)
  const [modalAction, setModalAction] = useState('')
  const [modalParam, setModalParam] = useState('')
  const onChooseEvent = () => {
    setModalAction('')
    setModalParam('')
    setOpen(true)
  }
  const handleChangeAction = (value: string) => {
    setModalParam('')
    if (value === 'none') {
      setModalParam('none')
    }
    setModalAction(value)
  }
  const handleChangeParam = (value: string) => {
    setModalParam(value)
  }
  const onChangeParam = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalParam(e.target.value)
  }
  const getDialogOption = (): optionType[] => {
    const DialogArr: optionType[] = []
    schema.container.forEach((val) => {
      if (dialogReg.test(val.key)) {
        DialogArr.push({
          label: val.name!,
          value: val.name!
        })
      }
    })
    return DialogArr
  }
  const getTypeDialogOption = (): optionType[] => {
    const DialogArr: optionType[] = []
    schema.container.forEach((val) => {
      if (dialogReg.test(val.key)) {
        DialogArr.push({
          label: val.name!,
          value: JSON.stringify({
            type: 'selectDialog',
            value: val.name!
          })
        })
      }
    })
    return DialogArr
  }
  const handleOk = () => {
    setAction(modalAction)
    setParam(modalParam)
    setOpen(false)
  }
  const handleCancel = () => {
    setOpen(false)
  }
  const onSubmit = () => {
    const newSchema = deepcopy(state.schema)
    if (focusing) {
      const element = getBlockElementByIndexes(
        newSchema,
        focusing.containerIndex,
        focusing.blockIndex
      )
      if (element === 'notFound') {
        dispatch({
          type: 'setFoucsing',
          payload: null
        })
        return
      }
      element.props.style = styleObj
      element.props.attr = attrObj
      if (element.props.style.position === 'relative') {
        element.position.left = 0
        element.position.top = 0
      }
      if (action === 'none' || param === 'none') {
        element.event = {}
      }
      if (action && action !== 'none') {
        element.event.action = action
        element.event.param = param
      }
      if (size.width) element.position.width = Number(size.width) || size.width
      if (size.height) element.position.height = Number(size.height) || size.height
      if (size.left) element.position.left = Number(size.left) || 0
      if (size.top) element.position.top = Number(size.top) || 0
      if (element.blocks && getKeyElementByBlocks('tabHeader', element.blocks)) {
        getKeyElementByBlocks('tabHeader', element.blocks)!.position.height =
          tabPropsRef.current!.fetchTabAttr().newHeaderHeight
      }
      dispatch({
        type: 'setSchema',
        payload: newSchema
      })
      dispatch({
        type: 'pushQueue',
        payload: newSchema
      })
      message.success('成功')
    }
  }
  const onSelectAttr = (name: string) => {
    return (value: any) => {
      setAttrObj({
        ...attrObj,
        [name]: JSON.parse(value)
      })
    }
  }
  const getAttrSelector = (val: any) => {
    if (typeof val[1] === 'object' && val[1].type === 'selectDialog') {
      return (
        <Select
          defaultValue={val[1].value}
          key={val[0]}
          style={{ width: 220 }}
          onSelect={onSelectAttr(val[0])}
          options={getTypeDialogOption()}
        />
      )
    } else {
      return (
        <Input
          name={val[0]}
          disabled={val[1].type === 'disabled'}
          value={getAttrValue(val[1])}
          onChange={onChangeAttr}
        />
      )
    }
  }
  const onSelectStyle = (name: string) => {
    return (value: any) => {
      setStyleObj({
        ...styleObj,
        [name]: value
      })
    }
  }
  const getCssSelector = (val: any) => {
    const filterUrl = (value: string) => {
      const reg = /url\(([\s\S]*)\)/
      const result = value.match(reg)
      return result ? result[1] : ''
    }
    const selectItem = [
      'textAlign',
      'fontWeight',
      'textDecoration',
      'position',
      'display',
      'flexDirection',
      'justifyContent',
      'alignItems'
    ]
    if (selectItem.includes(val[0])) {
      return (
        <Select
          defaultValue={val[1]}
          key={val[0]}
          style={{ width: 220 }}
          onSelect={onSelectStyle(val[0])}
          options={cssOption[val[0]]}
        />
      )
    } else if (val[0] === 'backgroundImage') {
      return <Input name={val[0]} value={filterUrl(val[1])} onChange={onChangeBackgroundImage} />
    } else {
      return <Input name={val[0]} value={val[1]} onChange={onChangeStyle} />
    }
  }
  const tabPropsRef = useRef<{ fetchTabAttr: BaseFunction }>()
  const relativeCss = ['marginLeft', 'marginRight', 'marginTop', 'marginBottom']
  const flexCss = ['flexDirection', 'justifyContent', 'alignItems']
  return (
    <div>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: !(
            (modalAction && modalParam) ||
            (modalAction === 'backTop' && modalParam === '')
          )
        }}
        destroyOnClose
        bodyStyle={{ height: '150px' }}
      >
        <div className="mb-4">
          <div>选择事件：</div>
          <Select
            style={{ width: 220 }}
            onChange={handleChangeAction}
            options={[
              {
                value: 'openDialog',
                label: '打开弹窗'
              },
              {
                value: 'openLink',
                label: '跳转链接'
              },
              {
                value: 'backTop',
                label: '回到顶部'
              },
              {
                value: 'none',
                label: '无'
              }
            ]}
          />
        </div>

        {modalAction === 'openDialog' && (
          <div className="mb-4">
            <div>弹窗名称：</div>
            <Select
              style={{ width: 220 }}
              onChange={handleChangeParam}
              options={getDialogOption()}
            />
          </div>
        )}
        {modalAction === 'openLink' && (
          <div className="mb-4">
            <div>链接地址：</div>
            <Input onChange={onChangeParam} />
          </div>
        )}
      </Modal>
      {show ? (
        element ? (
          <div>
            <div className="mb-2">
              组件名称：
              {registerConfig.componentMap[element.key as MaterialItemsKeys].label}
            </div>
            {element.tabAttr && <TabLayoutProps ref={tabPropsRef} />}
            <div
              className="mb-2"
              style={{ display: size.width || size.width === '' ? 'block' : 'none' }}
            >
              宽度:
              <Input name="width" onChange={onChangeWidth} value={size.width || ''} />
            </div>
            <div
              className="mb-2"
              style={{ display: size.height || size.height === '' ? 'block' : 'none' }}
            >
              高度:
              <Input name="height" onChange={onChageHeight} value={size.height || ''} />
            </div>
            <div
              className="mb-2"
              style={{ display: size.left || size.left === '' ? 'block' : 'none' }}
            >
              X:
              <Input name="left" onChange={onChangeLeft} value={size.left || ''} />
            </div>
            <div
              className="mb-2"
              style={{ display: size.top || size.top === '' ? 'block' : 'none' }}
            >
              Y:
              <Input name="top" onChange={onChangeTop} value={size.top || ''} />
            </div>

            {Object.entries(styleObj).map((val: Record<string, any>, ind: number) => {
              return (
                <div
                  key={ind}
                  className="block mb-4"
                  style={{
                    display:
                      (styleObj.position === 'absolute' && relativeCss.includes(val[0])) ||
                      (styleObj.display === 'block' && flexCss.includes(val[0]))
                        ? 'none'
                        : 'block'
                  }}
                >
                  <div>{attributeMap[val[0]] ? attributeMap[val[0]] : val[0]}:</div>
                  {getCssSelector(val)}
                </div>
              )
            })}
            {Object.entries(attrObj).map((val: Record<string, any>, ind: number) => {
              return (
                <div key={ind} className="block mb-4">
                  <div>{attributeMap[val[0]] ? attributeMap[val[0]] : val[0]}:</div>
                  {getAttrSelector(val)}
                </div>
              )
            })}
            {!element.event.disable && (
              <>
                <div className="mb-4 break-all">
                  <span>
                    交互：
                    <>
                      {action && action !== 'none' && param !== 'none' ? (
                        <>
                          {eventMap[action]}
                          {param ? '-' + param : ''}
                        </>
                      ) : (
                        <>无</>
                      )}
                    </>
                  </span>
                  <Button className="ml-5" type="primary" size="small" onClick={onChooseEvent}>
                    设置交互
                  </Button>
                </div>
              </>
            )}
            {JSON.stringify(styleObj) === '{}' &&
            JSON.stringify(attrObj) === '{}' &&
            size.width &&
            size.height &&
            size.left &&
            size.top &&
            element.event.disable ? (
              <div>无可编辑属性</div>
            ) : (
              <Button type="primary" onClick={onSubmit}>
                保存
              </Button>
            )}
          </div>
        ) : (
          <div>无选中元素</div>
        )
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default TabProps
