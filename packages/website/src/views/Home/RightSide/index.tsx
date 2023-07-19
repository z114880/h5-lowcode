import { FC, useContext } from 'react'
import { Tabs } from 'antd'
import TabProps from './TabProps'
import TabAnimation from './TabAnimation'
import { getBlockElementByIndexes } from '@/editor/utils/tools'
import { SchemaContext } from '@/utils/context'

const RightSide: FC = () => {
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
  const size = {
    width: element?.position?.width,
    height: element?.position?.height,
    left: element?.position?.left,
    top: element?.position?.top
  }

  const reRenderKey = (): string => {
    let key = 'key-'
    if (focusing) {
      key += focusing?.key + focusing?.containerIndex + focusing?.blockIndex
    }
    return key
  }

  const items = [
    {
      label: `属性`,
      key: '1',
      children: <TabProps size={size} key={reRenderKey()} />
    },
    {
      label: `动画`,
      key: '2',
      children: <TabAnimation key={reRenderKey()} />
    }
  ]
  const onChangeTab = (activeKey: string) => {
    dispatch({
      type: 'setActiveTabKey',
      payload: activeKey
    })
  }
  return (
    <aside className="w-[400px] h-full px-6 shadow-md overflow-y-scroll pb-4">
      <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />
    </aside>
  )
}

export default RightSide
