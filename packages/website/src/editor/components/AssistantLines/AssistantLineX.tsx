import React, { FC, useRef, useContext } from 'react'
import { SchemaContext } from '@/utils/context'
import { getBlockElementByIndexes } from '@/editor/utils/tools'

type AssistantLineXProps = {
  index: number
  left: number
  height: number
  tipPos: {
    left: number
    top: number
    show: boolean
  }
  editor: string
}
type position = {
  x: number
  startPos?: { x: number }
}
const AssistantLineX: FC<AssistantLineXProps> = (props) => {
  const { left, height, index, tipPos, editor } = props
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
    x: 0,
    startPos: { x: 0 }
  })
  const mouseMove = (e: MouseEvent) => {
    window.enableClick = false
    e.stopPropagation()
    const durX = e.pageX - pos.current.x
    const left = pos.current.startPos!.x + durX
    const currentEditorName = getCurrentEditor()
    dispatch({
      type: 'setAssistantLineXArr',
      payload: {
        index,
        value: {
          value: left,
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
      type: 'updateAssistantLineXArr',
      payload: {
        index
      }
    })
    dispatch({
      type: 'hideAssistantLineXTipPos',
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
    document.getElementById('middleSection')!.style.cursor = 'col-resize'
    pos.current.x = e.pageX
    pos.current.startPos = {
      x: left
    }
    document.onmousemove = mouseMove
    document.onmouseup = mouseUp
  }
  const getTipText = () => {
    if (left < 0 || left > 374) {
      return ''
    }
    return 'x:' + left
  }

  return (
    <>
      <div
        onMouseDown={mouseDown}
        style={{
          height: height,
          left: left,
          display: getCurrentEditor() === editor ? 'block' : 'none'
        }}
        className="w-px min-h-[570px] absolute top-[0] bg-red-300 z-[999] resize-col"
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

export default AssistantLineX
