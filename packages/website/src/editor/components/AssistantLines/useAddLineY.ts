import React, { useRef } from 'react'
import { stateType } from '@/utils/context'
import { getBlockElementByIndexes } from '@/editor/utils/tools'
type position = {
  y: number
  startPos?: { y: number }
}
export default function useAddLineX(state: stateType, dispatch: BaseFunction) {
  const { assistantLineYArr, currentEditor, schema } = state
  const pos = useRef<position>({
    y: 0,
    startPos: { y: 0 }
  })
  const mouseMove = (e: MouseEvent) => {
    window.enableClick = false
    e.stopPropagation()
    const durY = e.pageY - pos.current.y
    //如果移动了就在up入队列
    const top = pos.current.startPos!.y + durY
    if (assistantLineYArr.length > 0) {
      let currentEditorName
      if (currentEditor.current === 'main') {
        currentEditorName = 'main'
      } else if (currentEditor.current === 'dialog') {
        currentEditorName = getBlockElementByIndexes(schema, currentEditor.containerIndex, []).name
      }
      dispatch({
        type: 'setAssistantLineYArr',
        payload: {
          index: assistantLineYArr.length - 1,
          value: {
            value: top,
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
      type: 'addAssistantLineYArr',
      payload: { value: -10, tipPos: { left: -100, top: -100, show: false }, editor: '' }
    })
    dispatch({
      type: 'hideAssistantLineYTipPos',
      payload: { index: assistantLineYArr.length - 1 }
    })
    e.stopPropagation()
    document.getElementById('middleSection')!.style.cursor = 'unset'
    document.onmousemove = null
    document.onmouseup = null
  }
  const mouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    e.stopPropagation()
    document.getElementById('middleSection')!.style.cursor = 'row-resize'
    pos.current.y = e.pageY
    pos.current.startPos = {
      y: e.pageY - 111
    }
    document.onmousemove = mouseMove
    document.onmouseup = mouseUp
  }
  return { mouseDown }
}
