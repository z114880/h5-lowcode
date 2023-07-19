import React, { FC, useContext, useRef } from 'react'
import { registerConfig } from '@/components/EditableMaterial'
import { SchemaContext } from '@/utils/context'
import deepcopy from 'deepcopy'
import { MaterialItemsKeys, blockType } from '@/editor/types'
import Resizer from '@/editor/components/Resizer'
import ContainerBlockBorder from '@/editor/components/ContainerBlockBorder'
import useFocus from '@/editor/hooks/useFocus'
import {
  getBlockElementByIndexes,
  getKeyElementByBlocks,
  getKeyIndexByBlocks
} from '@/editor/utils/tools'
import { useContextMenu } from 'react-contexify'
import HeaderResizer from './HeaderResizer'
import HeaderItemResizer from './HeaderItemResizer'
import slash from '@/assets/images/background/slash.jpeg'
import EditorBlock from '@/editor/components/EditorBlock'
import BaseLayout from '@/components/EditableMaterial/BaseLayout'

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
}

const MENU_ID = 'rightPannel'

const TabLayout: FC<propsType> = (props) => {
  const { containerIndex, blockIndex, slotName, double, left, right, bottom, top, rightBottom } =
    props
  const { state, dispatch } = useContext(SchemaContext)
  const element = getBlockElementByIndexes(state.schema, containerIndex, blockIndex)
  const key = state.dragging as MaterialItemsKeys

  const { handleClick, isFocusing } = useFocus(
    dispatch,
    state.focusing,
    'tabLayout',
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
  const headerItemDrop = (tabIndex: number, itemRef?: HTMLElement) => (e: React.DragEvent) => {
    if (!itemRef) return
    e.stopPropagation()
    if (preventDragArr.includes(key)) return
    const rect = itemRef.getBoundingClientRect()
    const newSchema = deepcopy(state.schema)
    const position = registerConfig.componentMap[key as MaterialItemsKeys].position
    const props = registerConfig.componentMap[key as MaterialItemsKeys].props
    const event = registerConfig.componentMap[key as MaterialItemsKeys].event
    const animation = registerConfig.componentMap[key as MaterialItemsKeys].animation

    const block = {
      key: key,
      position: {
        top: e.pageY - rect!.y - position.height / 2,
        left: e.pageX - rect!.x - position.width / 2,
        ...position
      },
      props: { ...props },
      event: { ...event },
      animation: { ...animation }
    }
    const tabElement = getBlockElementByIndexes(newSchema, containerIndex, blockIndex)
    const active = tabElement.tabAttr.active
    const tabHeader = getKeyElementByBlocks('tabHeader', tabElement.blocks)!
    const tabHeaderItem = getKeyElementByBlocks('tabHeaderItem', tabHeader.blocks!, tabIndex)!
    if (active === tabIndex) {
      const tabHeaderItemActive = getKeyElementByBlocks(
        'tabHeaderItemActive',
        tabHeaderItem!.blocks!
      )!
      tabHeaderItemActive.blocks!.push(block)
    } else {
      const tabHeaderItemDeActive = getKeyElementByBlocks(
        'tabHeaderItemDeActive',
        tabHeaderItem!.blocks!
      )!
      tabHeaderItemDeActive.blocks!.push(block)
    }
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

  const headerItemsRef = useRef<Map<string, HTMLElement> | null>(null)

  function getMap() {
    if (!headerItemsRef.current) {
      // Initialize the Map on first usage.
      headerItemsRef.current = new Map()
    }
    return headerItemsRef.current
  }

  return (
    <div
      onClick={handleClick}
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
    >
      <ContainerBlockBorder isFocusing={isFocusing} />
      <Resizer
        type="container"
        containerIndex={containerIndex}
        blockIndex={blockIndex}
        left={left || false}
        right={right || false}
        bottom={bottom || false}
        top={top || false}
        rightBottom={rightBottom || false}
        isFocusing={isFocusing}
        double={double}
        isContainer={true}
      >
        <mat-tablayout
          style={{
            ...element.position,
            ...element.props.style
          }}
        >
          <mat-tabheader
            style={{
              height: getKeyElementByBlocks('tabHeader', element.blocks)!.position.height,
              background: `url(${slash})`
            }}
            slot="content"
          >
            <HeaderResizer
              containerIndex={containerIndex}
              blockIndex={blockIndex}
              isFocusing={isFocusing}
              isContainer={true}
            >
              {getKeyElementByBlocks('tabHeader', element.blocks)!.blocks!.map(
                (headerItemVal: Record<string, any>, haderItemInd: number) => {
                  const newBlockIndex = deepcopy(blockIndex)
                  newBlockIndex.push(getKeyIndexByBlocks('tabHeader', element.blocks)!)
                  newBlockIndex.push(haderItemInd)
                  return (
                    <mat-tabheaderitem
                      key={haderItemInd}
                      ref={(node: HTMLElement) => {
                        const map = getMap()
                        if (node) {
                          map.set('headerItem-' + haderItemInd, node)
                        } else {
                          map.delete('headerItem-' + haderItemInd)
                        }
                      }}
                      style={{ width: headerItemVal.position.width }}
                      slot="content"
                      tab-index={haderItemInd}
                      is-last={
                        getKeyElementByBlocks('tabHeader', element.blocks)!.blocks!.length - 1 ===
                        haderItemInd
                          ? 'true'
                          : 'false'
                      }
                      active={element.tabAttr.active}
                      actived-background-color={element.props.attr.activedBackgroundColor}
                      deactived-background-color={element.props.attr.deactivedBackgroundColor}
                      onDragEnter={dragenter}
                      onDragOver={dragover}
                      onDragLeave={dragleave}
                      onDrop={headerItemDrop(
                        haderItemInd,
                        headerItemsRef.current?.get('headerItem-' + haderItemInd)
                      )}
                    >
                      <ContainerBlockBorder
                        isFocusing={isFocusing}
                        left={false}
                        top={false}
                        right={true}
                        bottom={true}
                        slot="headerItem"
                      />
                      <HeaderItemResizer
                        isFocusing={isFocusing}
                        containerIndex={containerIndex}
                        blockIndex={newBlockIndex}
                        isContainer={true}
                      >
                        {element.tabAttr.active === haderItemInd
                          ? getKeyElementByBlocks(
                              'tabHeaderItemActive',
                              headerItemVal.blocks!
                            )!.blocks!.map((val: blockType, ind: number) => {
                              const newBlockIndex = deepcopy(blockIndex)
                              newBlockIndex.push(getKeyIndexByBlocks('tabHeader', element.blocks)!)
                              newBlockIndex.push(haderItemInd)
                              newBlockIndex.push(
                                getKeyIndexByBlocks('tabHeaderItemActive', headerItemVal.blocks!)!
                              )
                              newBlockIndex.push(ind)
                              return (
                                <mat-tabheaderitemactive
                                  key={ind}
                                  slot="content"
                                  style={{ display: 'block' }}
                                >
                                  <EditorBlock
                                    block={val}
                                    containerIndex={containerIndex}
                                    blockIndex={newBlockIndex}
                                    slotName="content"
                                  />
                                </mat-tabheaderitemactive>
                              )
                            })
                          : getKeyElementByBlocks(
                              'tabHeaderItemDeActive',
                              headerItemVal.blocks
                            )!.blocks!.map((val: blockType, ind: number) => {
                              const newBlockIndex = deepcopy(blockIndex)
                              newBlockIndex.push(getKeyIndexByBlocks('tabHeader', element.blocks)!)
                              newBlockIndex.push(haderItemInd)
                              newBlockIndex.push(
                                getKeyIndexByBlocks('tabHeaderItemDeActive', headerItemVal.blocks!)!
                              )
                              newBlockIndex.push(ind)
                              return (
                                <mat-tabheaderitemdeactive
                                  key={ind}
                                  slot="content"
                                  style={{ display: 'block' }}
                                >
                                  <EditorBlock
                                    block={val}
                                    containerIndex={containerIndex}
                                    blockIndex={newBlockIndex}
                                    slotName="content"
                                  />
                                </mat-tabheaderitemdeactive>
                              )
                            })}
                      </HeaderItemResizer>
                    </mat-tabheaderitem>
                  )
                }
              )}
            </HeaderResizer>
          </mat-tabheader>
          <mat-tabcontent slot="content">
            {getKeyElementByBlocks('tabContent', element.blocks)!.blocks!.map(
              (_val: Record<string, any>, ind: number) => {
                const newBlockIndex = deepcopy(blockIndex)
                newBlockIndex.push(getKeyIndexByBlocks('tabContent', element.blocks)!)
                newBlockIndex.push(ind)
                return (
                  <BaseLayout
                    key={ind}
                    containerIndex={containerIndex}
                    blockIndex={newBlockIndex}
                    slotName="content"
                    bottom={true}
                    hidden={ind !== element.tabAttr.active}
                  />
                )
              }
            )}
          </mat-tabcontent>
        </mat-tablayout>
      </Resizer>
    </div>
  )
}
export default TabLayout
