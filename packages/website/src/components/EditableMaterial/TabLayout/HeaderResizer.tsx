import React, { FC, ReactNode, useContext, useRef } from 'react'
import { SchemaContext } from '@/utils/context'
import deepcopy from 'deepcopy'
import { getBlockElementByIndexes, getKeyElementByBlocks } from '@/editor/utils/tools'

type propsType = {
  children: ReactNode
  blockIndex: number[]
  containerIndex: number
  isFocusing: boolean
  isContainer: boolean
}

const HeaderResizer: FC<propsType> = (props) => {
  const { state, dispatch } = useContext(SchemaContext)
  const { blockIndex, containerIndex, children, isFocusing, isContainer } = props
  const { schema } = state
  const isMoving = useRef<boolean>(false)
  const upSchema = useRef({})
  const resize = () => {
    return (e: React.MouseEvent) => {
      if (e.button !== 0) return
      e.stopPropagation()
      const startX = e.pageX
      const startY = e.pageY
      const mouseMove = (e: MouseEvent) => {
        window.enableClick = false
        e.stopPropagation()
        const durX = e.pageX - startX
        const durY = e.pageY - startY
        //如果移动了就在up入队列
        if (durX || durY) isMoving.current = true
        const newSchema = deepcopy(schema)
        const tabContainer = getBlockElementByIndexes(newSchema, containerIndex, blockIndex)
        if (getKeyElementByBlocks('tabHeader', tabContainer.blocks)!.position.height + durY >= 1) {
          getKeyElementByBlocks('tabHeader', tabContainer.blocks)!.position.height += durY
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
  }

  return (
    <>
      {children}
      <div
        style={{
          display: isFocusing ? 'block' : 'none',
          bottom: isContainer ? '-0.25rem' : 'calc(-0.25rem - 1px)'
        }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        onMouseDown={resize()}
        className="resize-s w-2 h-2 bg-white rounded-full border border-blue-400 absolute z-50 left-[calc(50%-0.25rem)]"
        slot="header-resizer"
      ></div>
    </>
  )
}
HeaderResizer.defaultProps = {
  isContainer: true
}
export default HeaderResizer
