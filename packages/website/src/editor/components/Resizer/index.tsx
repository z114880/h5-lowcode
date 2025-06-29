import React, { FC, ReactNode, useContext, useRef } from 'react'
import { SchemaContext } from '@/utils/context'
import deepcopy from 'deepcopy'
import { getBlockElementByIndexes } from '@/editor/utils/tools'
type propsType = {
  children: ReactNode
  type: 'block' | 'container'
  blockIndex: number[]
  containerIndex: number
  right: boolean
  bottom: boolean
  left: boolean
  top: boolean
  rightBottom: boolean
  isFocusing: boolean
  double?: boolean
  isContainer: boolean
}

const Resizer: FC<propsType> = ({
  children,
  type,
  blockIndex,
  containerIndex,
  right = true,
  bottom = true,
  left = true,
  top = true,
  rightBottom = true,
  isFocusing,
  double,
  isContainer = false
}) => {
  const { state, dispatch } = useContext(SchemaContext)
  const { schema } = state
  const isMoving = useRef<boolean>(false)
  const upSchema = useRef({})
  const resize = (resizeType: string) => {
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
        if (type === 'block') {
          const block = getBlockElementByIndexes(newSchema, containerIndex, blockIndex)
          if (resizeType == 'right') {
            if (block.position.width + durX >= 1) block.position.width += durX
            else return
          } else if (resizeType == 'bottom') {
            if (block.position.height + durY >= 1) block.position.height += durY
            else return
          } else if (resizeType == 'left') {
            if (block.position.width - durX >= 1) {
              if (block.props.style.position === 'absolute') {
                block.position.left += durX
              }
              block.position.width -= durX
            } else return
          } else if (resizeType == 'top') {
            if (block.position.height - durY >= 1) {
              if (block.props.style.position === 'absolute') {
                block.position.top += durY
              }
              block.position.height -= durY
            } else return
          } else if (resizeType == 'rightBottom') {
            if (block.position.width + durX >= 1 && block.position.height + durY >= 1) {
              block.position.width += durX
              block.position.height += durY
            } else return
          }
        } else if (type === 'container') {
          const container = getBlockElementByIndexes(newSchema, containerIndex, blockIndex)
          if (resizeType == 'bottom') {
            if (double) {
              if (container.position.height + durY * 2 >= 1) {
                container.position.height += durY * 2
              }
            } else {
              if (container.position.height + durY >= 1) {
                container.position.height += durY
              }
            }
          }
          if (resizeType == 'right') {
            if (double) {
              if (container.position.width + durX * 2 >= 1) {
                container.position.width += durX * 2
              }
            } else {
              if (container.position.width + durX >= 1) {
                container.position.width += durX
              }
            }
          }
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
      {right && (
        <div
          style={{
            display: isFocusing ? 'block' : 'none',
            right: isContainer ? '-0.25rem' : 'calc(-0.25rem - 1px)'
          }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          onMouseDown={resize('right')}
          className="resize-e w-2 h-2 bg-white rounded-full border border-blue-400 absolute z-50 top-[calc(50%-0.25rem)]"
        ></div>
      )}
      {bottom && (
        <div
          style={{
            display: isFocusing ? 'block' : 'none',
            bottom: isContainer ? '-0.25rem' : 'calc(-0.25rem - 1px)'
          }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          onMouseDown={resize('bottom')}
          className="resize-s w-2 h-2 bg-white rounded-full border border-blue-400 absolute z-50 left-[calc(50%-0.25rem)]"
        ></div>
      )}
      {left && (
        <div
          style={{
            display: isFocusing ? 'block' : 'none',
            left: isContainer ? '-0.25rem' : 'calc(-0.25rem - 1px)'
          }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          onMouseDown={resize('left')}
          className="resize-w w-2 h-2 bg-white rounded-full border border-blue-400 absolute z-50 top-[calc(50%-0.25rem)]"
        ></div>
      )}
      {top && (
        <div
          style={{
            display: isFocusing ? 'block' : 'none'
          }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          onMouseDown={resize('top')}
          className="resize-n w-2 h-2 bg-white rounded-full border border-blue-400 absolute z-50 -top-[0.25rem] left-[calc(50%-0.25rem)]"
        ></div>
      )}
      {rightBottom && (
        <div
          style={{
            display: isFocusing ? 'block' : 'none',
            right: isContainer ? '-0.25rem' : 'calc(-0.25rem - 1px)'
          }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          onMouseDown={resize('rightBottom')}
          className="resize-se w-2 h-2 bg-white rounded-full border border-blue-400 absolute z-50 -bottom-[0.25rem]"
        ></div>
      )}
    </>
  )
}
export default Resizer
