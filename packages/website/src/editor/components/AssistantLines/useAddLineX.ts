import React, { useRef } from 'react'
import { stateType } from '@/utils/context'
import { getBlockElementByIndexes } from '@/editor/utils/tools'
type position = {
  x: number
  startPos?: { x: number }
}
export default function useAddLineX(state: stateType, dispatch: BaseFunction) {
  const { assistantLineXArr, currentEditor, schema } = state
  const pos = useRef<position>({
    x: 0,
    startPos: { x: 0 }
  })
  const mouseMove = (e: MouseEvent) => {
    window.enableClick = false
    e.stopPropagation()
    const durX = e.pageX - pos.current.x
    //如果移动了就在up入队列
    const left = pos.current.startPos!.x + durX
    if (assistantLineXArr.length > 0) {
      let currentEditorName
      if (currentEditor.current === 'main') {
        currentEditorName = 'main'
      } else if (currentEditor.current === 'dialog') {
        currentEditorName = getBlockElementByIndexes(schema, currentEditor.containerIndex, []).name
      }
      dispatch({
        type: 'setAssistantLineXArr',
        payload: {
          index: assistantLineXArr.length - 1,
          value: {
            value: left,
            tipPos: { left: e.pageX, top: e.pageY, show: true },
            editor: currentEditorName
          }
        }
      })
    }
  }
  const mouseUp = (e: MouseEvent) => {
    setTimeout(() => {
      window.enableClick = true
    }, 0)
    dispatch({
      type: 'addAssistantLineXArr',
      payload: { value: -10, tipPos: { left: -100, top: -100, show: false }, editor: '' }
    })
    dispatch({
      type: 'hideAssistantLineXTipPos',
      payload: { index: assistantLineXArr.length - 1 }
    })
    e.stopPropagation()
    document.getElementById('middleSection')!.style.cursor = 'unset'
    document.onmousemove = null
    document.onmouseup = null
  }
  const mouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    e.stopPropagation()
    document.getElementById('middleSection')!.style.cursor = 'col-resize'
    pos.current.x = e.pageX
    pos.current.startPos = {
      x: e.pageX - 541
    }
    document.onmousemove = mouseMove
    document.onmouseup = mouseUp
  }
  return { mouseDown }
}
