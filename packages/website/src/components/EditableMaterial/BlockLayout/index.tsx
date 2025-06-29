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
import useBlockDragger from '@/editor/hooks/useBlockDragger'
type propsType = {
  containerIndex: number
  blockIndex: number[]
  slotName?: string
  left?: boolean
  right?: boolean
  bottom?: boolean
  top?: boolean
  rightBottom?: boolean
  hidden?: boolean
}

const MENU_ID = 'rightPannel'

const BlockLayout: FC<propsType> = ({ containerIndex, blockIndex, slotName, hidden = false }) => {
  const { state, dispatch } = useContext(SchemaContext)
  const containerRef = useRef<HTMLDivElement>(null)
  const element = getBlockElementByIndexes(state.schema, containerIndex, blockIndex)
  const key = state.dragging as MaterialItemsKeys

  const { mouseDown } = useBlockDragger(element, containerIndex, blockIndex)

  const { handleClick, isFocusing } = useFocus(
    dispatch,
    state.focusing,
    'blockLayout',
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
  const resizeLeft = isNumber(element?.position?.width)
  const resizeRight = isNumber(element?.position?.width)
  const resizeTop = isNumber(element?.position?.height)
  const resizeBottom = isNumber(element?.position?.height)
  const resizeRightBottom =
    isNumber(element?.position?.width) && isNumber(element?.position?.height)
  const newStyle = {
    ...element.props.style
  }
  Reflect.deleteProperty(newStyle, 'marginLeft')
  Reflect.deleteProperty(newStyle, 'marginTop')
  Reflect.deleteProperty(newStyle, 'marginRight')
  Reflect.deleteProperty(newStyle, 'marginBottom')

  return (
    <div
      onDragEnter={dragenter}
      onDragOver={dragover}
      onDragLeave={dragleave}
      onDrop={drop}
      onClick={handleClick}
      onMouseDown={element.props.style.position === 'absolute' ? mouseDown : undefined}
      ref={containerRef}
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
      style={{
        display: hidden ? 'none' : 'block',
        ...element.position,
        position: element.props.style.position,
        marginLeft: element.props.style.marginLeft,
        marginTop: element.props.style.marginTop,
        marginRight: element.props.style.marginRight,
        marginBottom: element.props.style.marginBottom
      }}
    >
      <ContainerBlockBorder isFocusing={isFocusing} />
      <Resizer
        type="block"
        containerIndex={containerIndex}
        blockIndex={blockIndex}
        left={resizeLeft}
        right={resizeRight}
        bottom={resizeBottom}
        top={resizeTop}
        rightBottom={resizeRightBottom}
        isFocusing={isFocusing}
        isContainer={true}
      >
        <mat-blocklayout style={newStyle}>
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
        </mat-blocklayout>
      </Resizer>
    </div>
  )
}
export default BlockLayout
