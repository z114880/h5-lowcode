import React, { FC, useContext, useRef } from 'react'
import EditorBlock from '@/editor/components/EditorBlock'
import { blockType } from '@/editor/types/index'
import { registerConfig } from '@/components/EditableMaterial'
import { SchemaContext } from '@/utils/context'
import deepcopy from 'deepcopy'
import { MaterialItemsKeys } from '@/editor/types'
import Resizer from '@/editor/components/Resizer'
import ContainerBlockBorder from '@/editor/components/ContainerBlockBorder'
import useFocus from '@/editor/hooks/useFocus'
import { getBlockElementByIndexes, getBlocksByIndexes } from '@/editor/utils/tools'
import { useContextMenu } from 'react-contexify'
import { isNumber } from '@/utils/tools'

type propsType = {
  containerIndex: number
  blockIndex: number[]
  slotName?: string
  double?: boolean
  left?: boolean
  right?: boolean
  bottom?: boolean
  top?: boolean
  rightBottom?: boolean
  hidden?: boolean
}

const MENU_ID = 'rightPannel'

const BaseLayout: FC<propsType> = (props) => {
  const { containerIndex, blockIndex, slotName, double, left, right, bottom, top, rightBottom } =
    props
  const { state, dispatch } = useContext(SchemaContext)
  const containerRef = useRef<HTMLDivElement>(null)
  const element = getBlockElementByIndexes(state.schema, containerIndex, blockIndex)
  const key = state.dragging as MaterialItemsKeys
  const { handleClick, isFocusing } = useFocus(
    dispatch,
    state.focusing,
    'baseLayout',
    containerIndex,
    blockIndex
  )

  const preventDragArr = ['baseLayout', 'tabLayout']

  const dragenter = (e: React.DragEvent) => {
    e.stopPropagation()
    if (preventDragArr.includes(key)) return
    e.dataTransfer!.dropEffect = 'move' // h5拖动的图标
  }
  const dragover = (e: React.DragEvent) => {
    e.stopPropagation()
    if (preventDragArr.includes(key)) return
    e.preventDefault()
  }
  const dragleave = (e: React.DragEvent) => {
    e.stopPropagation()
    if (preventDragArr.includes(key)) return
    e.dataTransfer!.dropEffect = 'none'
  }
  const drop = (e: React.DragEvent) => {
    e.stopPropagation()
    if (preventDragArr.includes(key)) return
    const rect = containerRef.current?.getBoundingClientRect()
    const newSchema = deepcopy(state.schema)
    const position = registerConfig.componentMap[key as MaterialItemsKeys].position
    const props = registerConfig.componentMap[key as MaterialItemsKeys].props
    const event = registerConfig.componentMap[key as MaterialItemsKeys].event
    const animation = registerConfig.componentMap[key as MaterialItemsKeys].animation
    const blocks = registerConfig.componentMap[key as MaterialItemsKeys].blocks || []

    const block = {
      key: key,
      position: {
        top: e.pageY - rect!.y - position.height / 2,
        left: e.pageX - rect!.x - position.width / 2,
        ...position
      },
      props: { ...props },
      event: { ...event },
      animation: { ...animation },
      blocks
    }
    const fatherElement = getBlocksByIndexes(newSchema, containerIndex, blockIndex)
    fatherElement.push(block)
    dispatch({
      type: 'setSchema',
      payload: newSchema
    })
    dispatch({
      type: 'pushQueue',
      payload: newSchema
    })
  }
  const { show } = useContextMenu({
    id: MENU_ID
  })
  const resizeLeft = isNumber(element?.position?.width) && left
  const resizeRight = isNumber(element?.position?.width) && right
  const resizeTop = isNumber(element?.position?.height) && top
  const resizeBottom = isNumber(element?.position?.height) && bottom
  const resizeRightBottom =
    isNumber(element?.position?.width) && isNumber(element?.position?.height) && rightBottom
  return (
    <div
      onDragEnter={dragenter}
      onDragOver={dragover}
      onDragLeave={dragleave}
      onDrop={drop}
      onClick={handleClick}
      ref={containerRef}
      className="relative"
      slot={slotName ? slotName : ''}
      onContextMenu={(event) => {
        event.stopPropagation()
        show({
          event,
          props: {
            containerIndex,
            blockIndex
          }
        })
      }}
      style={{ display: props.hidden ? 'none' : 'block' }}
    >
      <ContainerBlockBorder isFocusing={isFocusing} />
      <Resizer
        type="container"
        containerIndex={containerIndex}
        blockIndex={blockIndex}
        left={resizeLeft || false}
        right={resizeRight || false}
        bottom={resizeBottom || false}
        top={resizeTop || false}
        rightBottom={resizeRightBottom || false}
        isFocusing={isFocusing}
        double={double}
        isContainer={true}
      >
        <mat-baselayout
          style={{
            ...element.position,
            ...element.props.style
          }}
        >
          {element.blocks.map((val: blockType, ind: number) => {
            const newBlockIndex = deepcopy(blockIndex)
            newBlockIndex.push(ind)
            if (val.key === 'blockLayout') {
              return registerConfig.componentMap['blockLayout'].editor(
                containerIndex,
                newBlockIndex,
                ind
              )
            }
            return (
              <EditorBlock
                block={val}
                containerIndex={containerIndex}
                blockIndex={newBlockIndex}
                key={ind}
                slotName="content"
              />
            )
          })}
        </mat-baselayout>
      </Resizer>
    </div>
  )
}
BaseLayout.defaultProps = {
  hidden: false
}
export default BaseLayout
