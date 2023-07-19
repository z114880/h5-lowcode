import React, { FC, ReactNode, useContext, useRef } from 'react'
import { SchemaContext } from '@/utils/context'
import deepcopy from 'deepcopy'
import { getBlockElementByIndexes } from '@/editor/utils/tools'

type propsType = {
  children: ReactNode
  blockIndex: number[]
  containerIndex: number
  isFocusing: boolean
  isContainer: boolean
}

const HeaderItemResizer: FC<propsType> = (props) => {
  const { state, dispatch } = useContext(SchemaContext)
  const { blockIndex, containerIndex, children, isFocusing, isContainer } = props
  const { schema } = state
  const isMoving = useRef<boolean>(false)
  const upSchema = useRef({})
  const resize = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    e.stopPropagation()
    const startX = e.pageX
    const mouseMove = (e: MouseEvent) => {
      window.enableClick = false
      e.stopPropagation()
      const durX = e.pageX - startX
      //如果移动了就在up入队列
      if (durX) isMoving.current = true
      const newSchema = deepcopy(schema)
      const tabHeaderItem = getBlockElementByIndexes(newSchema, containerIndex, blockIndex)
      if (tabHeaderItem.position.width + durX >= 1) {
        tabHeaderItem.position.width += durX
      }
      dispatch({
        type: 'setSchema',
        payload: newSchema
      })
      upSchema.current = newSchema
    }
    const mouseUp = (e: MouseEvent) => {
      setTimeout(() => {
        window.enableClick = true
      }, 0)
      if (isMoving.current) {
        isMoving.current = false
        dispatch({
          type: 'pushQueue',
          payload: upSchema.current
        })
      }
      e.stopPropagation()
      document.onmousemove = null
      document.onmouseup = null
    }
    document.onmousemove = mouseMove
    document.onmouseup = mouseUp
  }

  return (
    <>
      {children}
      <div
        style={{
          display: isFocusing ? 'block' : 'none',
          right: isContainer ? '-0.25rem' : 'calc(-0.25rem - 1px)'
        }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        onMouseDown={resize}
        className="resize-e w-2 h-2 bg-white rounded-full border border-blue-400 absolute z-50 top-[calc(50%-0.25rem)]"
        slot="headerItem"
      ></div>
    </>
  )
}
HeaderItemResizer.defaultProps = {
  isContainer: true
}
export default HeaderItemResizer
