import React, { FC, useRef, useContext } from 'react'
import { SchemaContext } from '@/utils/context'
import { getBlockElementByIndexes } from '@/editor/utils/tools'

type AssistantLineYProps = {
  index: number
  top: number
  tipPos: {
    left: number
    top: number
    show: boolean
  }
  editor: string
}
type position = {
  y: number
  startPos?: { y: number }
}
const AssistantLineY: FC<AssistantLineYProps> = (props) => {
  const { top, index, tipPos, editor } = props
  const { state, dispatch } = useContext(SchemaContext)
  const getCurrentEditor = () => {
    let currentEditorName = ''
    if (state.currentEditor.current === 'main') {
      currentEditorName = 'main'
    } else if (state.currentEditor.current === 'dialog') {
      currentEditorName = getBlockElementByIndexes(
        state.schema,
        state.currentEditor.containerIndex,
        []
      ).name
    }
    return currentEditorName
  }
  const pos = useRef<position>({
    y: 0,
    startPos: { y: 0 }
  })
  const mouseMove = (e: MouseEvent) => {
    window.enableClick = false
    e.stopPropagation()
    const durY = e.pageY - pos.current.y
    const top = pos.current.startPos!.y + durY
    const currentEditorName = getCurrentEditor()
    dispatch({
      type: 'setAssistantLineYArr',
      payload: {
        index,
        value: {
          value: top,
          tipPos: { left: e.pageX, top: e.pageY, show: true },
          editor: currentEditorName
        }
      }
    })
  }
  const mouseUp = (e: MouseEvent) => {
    setTimeout(() => {
      window.enableClick = true
    }, 0)
    dispatch({
      type: 'updateAssistantLineYArr',
      payload: {
        index
      }
    })
    dispatch({
      type: 'hideAssistantLineYTipPos',
      payload: { index }
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
      y: top
    }
    document.onmousemove = mouseMove
    document.onmouseup = mouseUp
  }
  const getTipText = () => {
    if (top < 0) {
      return ''
    }
    return 'y:' + top
  }

  return (
    <>
      <div
        onMouseDown={mouseDown}
        style={{
          top: top,
          display: getCurrentEditor() === editor ? 'block' : 'none'
        }}
        className="w-[375px] h-px absolute left-[0] bg-red-300 z-[999] resize-row"
      ></div>
      <div
        className="fixed z-[999] bg-gray-200 flex justify-center items-center px-3 rounded-md text-gray-800"
        style={{
          userSelect: 'none',
          display: tipPos.show ? 'block' : 'none',
          left: tipPos.left + 10,
          top: tipPos.top - 30
        }}
      >
        {getTipText()}
      </div>
    </>
  )
}

export default AssistantLineY
