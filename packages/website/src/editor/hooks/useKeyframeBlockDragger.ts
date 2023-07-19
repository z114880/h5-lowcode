import React, { useContext, useRef } from 'react'
import { SchemaContext } from '@/utils/context'
import deepcopy from 'deepcopy'
import { blockType } from '@/editor/types'
import { getBlockElementByIndexes } from '@/editor/utils/tools'

export default function useKeyframeBlockDragger(
  block: blockType,
  containerIndex: number,
  blockIndex: number[]
) {
  const { state, dispatch } = useContext(SchemaContext)
  const isMoving = useRef<boolean>(false)
  const upSchema = useRef({})
  type position = {
    x: number
    y: number
    startPos?: { x: number; y: number }
  }
  const pos = useRef<position>({
    x: 0,
    y: 0,
    startPos: { x: 0, y: 0 }
  })
  const stepIndexRef = useRef<number>(-1)
  const mouseMove = (e: MouseEvent) => {
    window.enableClick = false
    e.stopPropagation()
    const durX = e.pageX - pos.current.x
    const durY = e.pageY - pos.current.y
    //如果移动了就在up入队列
    if (durX || durY) isMoving.current = true
    const blockLeft = pos.current.startPos!.x + durX
    const blockTop = pos.current.startPos!.y + durY
    const newSchema = deepcopy(state.schema)
    const newBlock = getBlockElementByIndexes(newSchema, containerIndex, blockIndex)
    newBlock.animation.keyframes!.steps[stepIndexRef.current].effectProperties.left = blockLeft
    newBlock.animation.keyframes!.steps[stepIndexRef.current].effectProperties.top = blockTop
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
    //入队列
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
  const mouseDown = (stepIndex: number) => (e: React.MouseEvent) => {
    if (e.button !== 0) return
    stepIndexRef.current = stepIndex
    e.stopPropagation()
    pos.current.x = e.pageX
    pos.current.y = e.pageY
    pos.current.startPos = {
      x: Number(block.animation.keyframes!.steps[stepIndex].effectProperties.left),
      y: Number(block.animation.keyframes!.steps[stepIndex].effectProperties.top)
    }
    document.onmousemove = mouseMove
    document.onmouseup = mouseUp
  }
  return {
    mouseDown
  }
}
