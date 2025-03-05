/* eslint-disable no-case-declarations */
import React, { createContext, FC, useReducer } from 'react'
import InitJson from '@/assets/mock/data-init.json'
import type { MaterialItemsKeys } from '@/editor/types'
import { schemaType, animationType } from '@/editor/types'
import { broadCastChannel } from './tools'
import { pageConfigType } from '@/editor/types'
export type focusingType = {
  key: MaterialItemsKeys
  containerIndex: number
  blockIndex: number[]
} | null

export type currentEditorType =
  | {
      current: 'main'
    }
  | {
      current: 'dialog'
      containerIndex: number
    }

export type stateType = {
  schema: schemaType
  dragging: MaterialItemsKeys | null
  focusing: focusingType
  currentEditor: currentEditorType
  animation: animationType | null
  pageConfig: pageConfigType
  showLine: boolean
  assistantLineXArr: Array<{
    value: number
    tipPos: { left: number; top: number; show: boolean }
    editor: string
  }>
  assistantLineYArr: Array<{
    value: number
    tipPos: { left: number; top: number; show: boolean }
    editor: string
  }>
  operationQueue: Array<schemaType>
  pointer: number
  activeTabKey: string
}

function reducer(state: stateType, action: { type: string; payload: any }) {
  switch (action.type) {
    case 'setSchema':
      broadCastChannel.postMessage({ ...state, schema: action.payload })
      return { ...state, schema: action.payload }
    case 'setDragging':
      return { ...state, dragging: action.payload }
    case 'setFocusing':
      return { ...state, focusing: action.payload }
    case 'setCurrentEditor':
      return { ...state, currentEditor: action.payload }
    case 'setAnimation':
      return { ...state, animation: action.payload }
    case 'setPageConfig':
      return { ...state, pageConfig: action.payload }
    case 'setShowLine':
      return { ...state, showLine: action.payload }
    case 'addAssistantLineXArr':
      const lastLineX = state.assistantLineXArr[state.assistantLineXArr.length - 1].value
      if (lastLineX >= 0 && lastLineX <= 374) {
        return { ...state, assistantLineXArr: [...state.assistantLineXArr, action.payload] }
      }
      return { ...state }
    case 'setAssistantLineXArr':
      const indexX = action.payload.index
      const valueX = action.payload.value
      const newAssistantLineXArr = [...state.assistantLineXArr]
      newAssistantLineXArr[indexX] = valueX
      return { ...state, assistantLineXArr: newAssistantLineXArr }
    case 'updateAssistantLineXArr':
      const updateIndexX = action.payload.index
      const updateValueX = state.assistantLineXArr[updateIndexX].value
      const updateAssistantLineXArr = [...state.assistantLineXArr]
      if (updateValueX < 0 || updateValueX > 374) {
        updateAssistantLineXArr.splice(updateIndexX, 1)
      }
      return { ...state, assistantLineXArr: updateAssistantLineXArr }
    case 'hideAssistantLineXTipPos':
      const hiddenIndexX = action.payload.index
      const hiddenAssistantLineXArr = [...state.assistantLineXArr]
      hiddenAssistantLineXArr[hiddenIndexX].tipPos.show = false
      return { ...state, assistantLineXArr: hiddenAssistantLineXArr }
    case 'addAssistantLineYArr':
      const lastLineY = state.assistantLineYArr[state.assistantLineYArr.length - 1].value
      if (lastLineY >= 0) {
        return { ...state, assistantLineYArr: [...state.assistantLineYArr, action.payload] }
      }
      return { ...state }
    case 'setAssistantLineYArr':
      const indexY = action.payload.index
      const valueY = action.payload.value
      const newAssistantLineYArr = [...state.assistantLineYArr]
      newAssistantLineYArr[indexY] = valueY
      return { ...state, assistantLineYArr: newAssistantLineYArr }
    case 'updateAssistantLineYArr':
      const updateIndexY = action.payload.index
      const updateValueY = state.assistantLineYArr[updateIndexY].value
      const updateAssistantLineYArr = [...state.assistantLineYArr]
      if (updateValueY < 0) {
        updateAssistantLineYArr.splice(updateIndexY, 1)
      }
      return { ...state, assistantLineYArr: updateAssistantLineYArr }
    case 'hideAssistantLineYTipPos':
      const hiddenIndexY = action.payload.index
      const hiddenAssistantLineYArr = [...state.assistantLineYArr]
      hiddenAssistantLineYArr[hiddenIndexY].tipPos.show = false
      return { ...state, assistantLineYArr: hiddenAssistantLineYArr }
    case 'pushQueue':
      //相同schema不入队列
      if (
        JSON.stringify(state.operationQueue[state.operationQueue.length - 1]) ===
        JSON.stringify(action.payload)
      ) {
        return { ...state }
      }
      if (state.pointer > 0) {
        const sliceQueue = state.operationQueue.slice(
          0,
          state.operationQueue.length - state.pointer
        )
        const nextQueue = [...sliceQueue, action.payload]
        //最多保存30条操作记录
        if (nextQueue.length > 30) nextQueue.shift()
        return { ...state, operationQueue: nextQueue, pointer: 0 }
      }
      const nextQueue = [...state.operationQueue, action.payload]
      //最多保存30条操作记录
      if (nextQueue.length > 30) nextQueue.shift()
      return { ...state, operationQueue: nextQueue }
    case 'undo':
      const undoLen = state.operationQueue.length
      const undoPointer = state.pointer + 1 > undoLen - 1 ? state.pointer : state.pointer + 1
      broadCastChannel.postMessage({
        ...state,
        pointer: undoPointer,
        schema: state.operationQueue[undoLen - undoPointer - 1]
      })
      return {
        ...state,
        pointer: undoPointer,
        schema: state.operationQueue[undoLen - undoPointer - 1]
      }
    case 'redo':
      const redoLen = state.operationQueue.length
      const redoPointer = state.pointer - 1 > -1 ? state.pointer - 1 : state.pointer
      broadCastChannel.postMessage({
        ...state,
        pointer: redoPointer,
        schema: state.operationQueue[redoLen - redoPointer - 1]
      })
      return {
        ...state,
        pointer: redoPointer,
        schema: state.operationQueue[redoLen - redoPointer - 1]
      }
    case 'setActiveTabKey':
      return { ...state, activeTabKey: action.payload }
    default:
      return state
  }
}

const initialState: stateType = {
  schema: InitJson as unknown as schemaType,
  dragging: null,
  focusing: null,
  currentEditor: { current: 'main' },
  animation: null,
  pageConfig: {},
  showLine: true,
  assistantLineXArr: [{ value: -10, tipPos: { left: -100, top: -100, show: false }, editor: '' }],
  assistantLineYArr: [{ value: -10, tipPos: { left: -100, top: -100, show: false }, editor: '' }],
  operationQueue: [InitJson as unknown as schemaType],
  pointer: 0,
  activeTabKey: '1'
}

const SchemaContext = createContext<{
  state: stateType
  dispatch: BaseFunction
}>({
  state: initialState,
  dispatch: () => {}
})

const ContextProvider: FC<{ children: React.ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <SchemaContext.Provider value={{ state, dispatch }}>{props.children}</SchemaContext.Provider>
  )
}

export { reducer, SchemaContext, ContextProvider }
