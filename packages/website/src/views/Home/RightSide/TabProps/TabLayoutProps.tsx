import { useState, useContext, forwardRef, useImperativeHandle, useEffect } from 'react'
import type { RadioChangeEvent } from 'antd'
import { Radio, Button, Input, Modal, Checkbox } from 'antd'
import { SchemaContext } from '@/utils/context'
import { getBlockElementByIndexes, getKeyElementByBlocks } from '@/editor/utils/tools'
import defaultAddTabJson from './defaultAddTab.json'
import defaultAddContent from './defaultAddContent.json'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import deepcopy from 'deepcopy'
import { isRegNumber } from '@/utils/tools'
import { blockType } from '../../../../../../../types/Schema'
import { useTranslation } from 'react-i18next'
// eslint-disable-next-line react/display-name
const TabLayoutProps = forwardRef((props, ref) => {
  const { state, dispatch } = useContext(SchemaContext)
  const { focusing, schema } = state
  const { t } = useTranslation()
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

  const tabs = getKeyElementByBlocks('tabHeader', element.blocks)!.blocks!
  const tabValue = element.tabAttr.active
  const [open, setOpen] = useState(false)
  const [box, setBox] = useState<CheckboxValueType[]>([])
  const [headerHeight, setHeaderHeight] = useState<string>(String(element.props.attr.headerHeight))

  useEffect(() => {
    setHeaderHeight(getKeyElementByBlocks('tabHeader', element.blocks)!.position.height)
  }, [element])

  const dispatchNewActive = (value: number) => {
    const newSchema = deepcopy(schema)
    if (focusing) {
      const newElement = getBlockElementByIndexes(
        newSchema,
        focusing.containerIndex,
        focusing.blockIndex
      )
      if (newElement === 'notFound') {
        dispatch({
          type: 'setFoucsing',
          payload: null
        })
        return
      }
      newElement.tabAttr.active = value
      dispatch({
        type: 'setSchema',
        payload: newSchema
      })
      dispatch({
        type: 'pushQueue',
        payload: newSchema
      })
    }
  }

  const onChange = (e: RadioChangeEvent) => {
    dispatchNewActive(e.target.value)
  }
  const onAddTab = () => {
    const newJson = deepcopy(defaultAddTabJson) as blockType
    const newContent = deepcopy(defaultAddContent) as blockType

    const newSchema = deepcopy(schema)
    if (focusing) {
      const newElement = getBlockElementByIndexes(
        newSchema,
        focusing.containerIndex,
        focusing.blockIndex
      )
      const tabs = getKeyElementByBlocks('tabHeader', newElement.blocks)!.blocks!
      getKeyElementByBlocks('tabHeader', newElement.blocks)!.blocks! = [...tabs, newJson]
      const content = getKeyElementByBlocks('tabContent', newElement.blocks)!.blocks!
      getKeyElementByBlocks('tabContent', newElement.blocks)!.blocks! = [...content, newContent]
      dispatch({
        type: 'setSchema',
        payload: newSchema
      })
      dispatch({
        type: 'pushQueue',
        payload: newSchema
      })
    }
  }
  const onChangeBox = (checkedValues: CheckboxValueType[]) => {
    setBox(checkedValues)
  }
  const handleOk = () => {
    const newTabs = deepcopy(tabs)
    const newContent = deepcopy(getKeyElementByBlocks('tabContent', element.blocks)!.blocks!)
    const newBox = deepcopy(box).sort((a, b) => (b as number) - (a as number))
    let active = -1
    newBox.forEach((val: CheckboxValueType) => {
      newTabs.splice(val as number, 1)
      newContent.splice(val as number, 1)
      if (element.tabAttr.active > val) {
        active = element.tabAttr.active - 1
      } else if (element.tabAttr.active === val) {
        active = 99999
      }
    })
    const newSchema = deepcopy(schema)
    if (focusing) {
      const newElement = getBlockElementByIndexes(
        newSchema,
        focusing.containerIndex,
        focusing.blockIndex
      )
      if (newElement === 'notFound') {
        dispatch({
          type: 'setFoucsing',
          payload: null
        })
        return
      }
      newElement.tabAttr.active = active
      getKeyElementByBlocks('tabHeader', newElement.blocks)!.blocks! = newTabs
      getKeyElementByBlocks('tabContent', newElement.blocks)!.blocks! = newContent
      dispatch({
        type: 'setSchema',
        payload: newSchema
      })
      dispatch({
        type: 'pushQueue',
        payload: newSchema
      })
    }
    setOpen(false)
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        fetchTabAttr() {
          const newHeaderHeight = isRegNumber(headerHeight) ? Number(headerHeight) : 100
          return { newHeaderHeight }
        }
      }
    },
    [tabs, headerHeight, element]
  )
  return (
    <>
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
        okButtonProps={{
          disabled: tabs.length === 0
        }}
        destroyOnClose
      >
        <div>{t('rightPannel.deleteTab')}:</div>
        <Checkbox.Group style={{ width: '100%' }} onChange={onChangeBox}>
          {tabs.map((_val: Record<string, any>, ind: number) => {
            return (
              <Checkbox key={ind} value={ind}>
                {ind + 1}
              </Checkbox>
            )
          })}
        </Checkbox.Group>
      </Modal>
      <div className="bg-gray-100 p-2 mb-2 rounded-md">
        <div className="mb-4">
          <div>{t('rightPannel.activeTab')}:</div>
          <Radio.Group onChange={onChange} value={tabValue}>
            {tabs.map((_val: Record<string, any>, ind: number) => {
              return (
                <Radio key={ind} value={ind}>
                  {ind + 1}
                </Radio>
              )
            })}
          </Radio.Group>
        </div>
        <div className="">
          <Button type="primary" onClick={onAddTab}>
            {t('rightPannel.addTab')}
          </Button>
          <Button className="ml-4" type="primary" onClick={() => setOpen(true)}>
            {t('rightPannel.deleteTab')}
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <div> {t('rightPannel.tabHeight')}:</div>
        <Input value={headerHeight} onChange={(e) => setHeaderHeight(e.target.value)} />
      </div>
    </>
  )
})

export default TabLayoutProps
