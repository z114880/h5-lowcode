import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { SchemaContext } from '@/utils/context'
import { Input, Button, Modal, Select, message } from 'antd'
import deepcopy from 'deepcopy'
import { getBlockElementByIndexes } from '@/editor/utils/tools'
import { getAttrValue, dialogReg, isRegNumber } from '@/utils/tools'
import { getKeyElementByBlocks } from '@/editor/utils/tools'
import { registerConfig } from '@/components/EditableMaterial'
import { MaterialItemsKeys } from '@/editor/types'
import getCssOption from './cssOption'
import TabLayoutProps from './TabLayoutProps'
import { useTranslation } from 'react-i18next'

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
  const { t, i18n } = useTranslation()

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
      if (size.left && element.props.style.position === 'absolute')
        element.position.left = Number(size.left) || 0
      if (size.top && element.props.style.position === 'absolute')
        element.position.top = Number(size.top) || 0
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
          key={val[0] + i18n.resolvedLanguage}
          style={{ width: 220 }}
          onSelect={onSelectStyle(val[0])}
          options={getCssOption(val[0], t)}
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
          <div>{t('rightPannel.chooseAction')}</div>
          <Select
            style={{ width: 220 }}
            onChange={handleChangeAction}
            options={[
              {
                value: 'openDialog',
                label: t('rightPannel.openDialog')
              },
              {
                value: 'openLink',
                label: t('rightPannel.openLink')
              },
              {
                value: 'backTop',
                label: t('rightPannel.backTop')
              },
              {
                value: 'none',
                label: t('rightPannel.none')
              }
            ]}
          />
        </div>

        {modalAction === 'openDialog' && (
          <div className="mb-4">
            <div>{t('rightPannel.modalName')}</div>
            <Select
              style={{ width: 220 }}
              onChange={handleChangeParam}
              options={getDialogOption()}
            />
          </div>
        )}
        {modalAction === 'openLink' && (
          <div className="mb-4">
            <div>{t('rightPannel.Url')}</div>
            <Input onChange={onChangeParam} />
          </div>
        )}
      </Modal>
      {show ? (
        element ? (
          <div>
            <div className="mb-2">
              {t('rightPannel.name')}:&nbsp;
              {t(
                'leftPannel.' + registerConfig.componentMap[element.key as MaterialItemsKeys].label
              )}
            </div>
            {element.tabAttr && <TabLayoutProps ref={tabPropsRef} />}
            <div
              className="mb-2"
              style={{ display: size.width || size.width === '' ? 'block' : 'none' }}
            >
              <div>{t('attribute.width')}:</div>
              <Input name="width" onChange={onChangeWidth} value={size.width || ''} />
            </div>
            <div
              className="mb-2"
              style={{ display: size.height || size.height === '' ? 'block' : 'none' }}
            >
              <div>{t('attribute.height')}:</div>
              <Input name="height" onChange={onChageHeight} value={size.height || ''} />
            </div>
            <div
              className="mb-2"
              style={{ display: size.left || size.left === '' ? 'block' : 'none' }}
            >
              <div>{t('attribute.X')}:</div>
              <Input name="left" onChange={onChangeLeft} value={size.left || ''} />
            </div>
            <div
              className="mb-2"
              style={{ display: size.top || size.top === '' ? 'block' : 'none' }}
            >
              <div>{t('attribute.Y')}:</div>
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
                  <div>{i18n.exists('css.' + val[0]) ? t('css.' + val[0]) : val[0]}:</div>
                  {getCssSelector(val)}
                </div>
              )
            })}
            {Object.entries(attrObj).map((val: Record<string, any>, ind: number) => {
              return (
                <div key={ind} className="block mb-4">
                  <div>
                    {i18n.exists('attribute.' + val[0]) ? t('attribute.' + val[0]) : val[0]}:
                  </div>
                  {getAttrSelector(val)}
                </div>
              )
            })}
            {!element.event.disable && (
              <>
                <div className="mb-4 break-all">
                  <span>
                    {t('rightPannel.action')}:
                    <>
                      {action && action !== 'none' && param !== 'none' ? (
                        <>
                          {t('rightPannel.' + action)}
                          {param ? ' - ' + param : ''}
                        </>
                      ) : (
                        <>{t('rightPannel.none')}</>
                      )}
                    </>
                  </span>
                  <Button className="ml-5" type="primary" size="small" onClick={onChooseEvent}>
                    {t('rightPannel.setAction')}
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
              <div>{t('rightPannel.noEditableAttribute')}</div>
            ) : (
              <Button type="primary" onClick={onSubmit}>
                {t('rightPannel.save')}
              </Button>
            )}
          </div>
        ) : (
          <div>{t('rightPannel.noChoosenElement')}</div>
        )
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default TabProps
