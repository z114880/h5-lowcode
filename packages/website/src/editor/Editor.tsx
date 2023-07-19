import React, { useContext, useEffect, useRef, useState, FC } from 'react'
import { SchemaContext } from '@/utils/context'
import { containerType } from './types'
import deepcopy from 'deepcopy'
import { MaterialItemsKeys } from '@/editor/types'
import { registerConfig } from '@/components/EditableMaterial'
import styles from './Editor.module.scss'
import classnames from 'classnames'
import AssistantLines from './components/AssistantLines'
import useRuler from './hooks/useRuler'
import useAddLineX from './components/AssistantLines/useAddLineX'
import useAddLineY from './components/AssistantLines/useAddLineY'

type propsType = {
  pageSchema: Array<containerType | null>
}

const Editor: FC<propsType> = (props) => {
  const { state, dispatch } = useContext(SchemaContext)
  const key = state.dragging as MaterialItemsKeys
  const dragenter = (e: React.DragEvent) => {
    e.stopPropagation()
    if (state.currentEditor.current === 'dialog') return
    if (key === 'baseLayout' || key === 'tabLayout') {
      e.dataTransfer!.dropEffect = 'move'
    }
  }
  const dragover = (e: React.DragEvent) => {
    e.stopPropagation()
    if (state.currentEditor.current === 'dialog') return
    if (key === 'baseLayout' || key === 'tabLayout') {
      e.preventDefault()
    }
  }
  const dragleave = (e: React.DragEvent) => {
    e.stopPropagation()
    if (state.currentEditor.current === 'dialog') return
    if (key === 'baseLayout' || key === 'tabLayout') {
      e.dataTransfer!.dropEffect = 'none'
    }
  }
  const drop = (e: React.DragEvent) => {
    //判断是type否是dialog模式，如果是就禁掉drop
    e.stopPropagation()
    if (state.currentEditor.current === 'dialog') return
    if (key === 'baseLayout' || key === 'tabLayout') {
      const newSchema = deepcopy(state.schema)
      newSchema.container.push({
        key: key,
        position: registerConfig.componentMap[key].position,
        props: registerConfig.componentMap[key].props,
        event: registerConfig.componentMap[key].event,
        animation: registerConfig.componentMap[key].animation,
        blocks: registerConfig.componentMap[key].blocks || [],
        tabAttr: registerConfig.componentMap[key].tabAttr || undefined
      })
      dispatch({
        type: 'setSchema',
        payload: newSchema
      })
      dispatch({
        type: 'pushQueue',
        payload: newSchema
      })
    }
  }
  const [contentHeight, setContentHeight] = useState(0)
  const containerWrapperRef = useRef<HTMLDivElement | null>(null)
  const EditorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerWrapperRef.current) {
      const max =
        containerWrapperRef.current!.clientHeight > (EditorRef as any).current.clientHeight
          ? containerWrapperRef.current!.clientHeight
          : (EditorRef as any).current.clientHeight
      setContentHeight(max)
      //监听dom属性变化
      const targetNode = containerWrapperRef.current
      //options：监听的子节点
      const options = {
        childList: true
      }
      //回调事件
      const callback = () => {
        const newMax =
          containerWrapperRef.current!.clientHeight > (EditorRef as any).current.clientHeight
            ? containerWrapperRef.current!.clientHeight
            : (EditorRef as any).current.clientHeight
        setContentHeight(newMax)
      }
      const mutationObserver = new MutationObserver(callback)
      mutationObserver.observe(targetNode!, options)
    }
  }, [containerWrapperRef, EditorRef])

  const { columnRef } = useRuler(EditorRef)
  const { mouseDown: mouseDownX } = useAddLineX(state, dispatch)
  const { mouseDown: mouseDownY } = useAddLineY(state, dispatch)

  return (
    <div>
      <div
        ref={EditorRef}
        className={classnames(
          styles.editor,
          styles.noScrollBar,
          'overflow-y-scroll w-[375px] min-h-[570px] max-h-[809px] h-[calc(100vh-160px)] overflow-x-hidden box-content bg-white relative'
        )}
      >
        <div
          ref={containerWrapperRef}
          className="w-full pb-96 relative flex flex-col"
          onDragEnter={dragenter}
          onDragOver={dragover}
          onDragLeave={dragleave}
          onDrop={drop}
        >
          {props.pageSchema.map((val: containerType | null, ind: number) => {
            if (!val) return
            return registerConfig.componentMap[val.key].editor(ind)
          })}
        </div>
        <AssistantLines height={contentHeight} />
      </div>
      <div
        onMouseDown={mouseDownY}
        className="rowRuler w-[394px] h-[15px] absolute top-[14px] overflow-hidden resize-row"
      />
      <div
        ref={columnRef}
        onMouseDown={mouseDownX}
        className="columnRuler w-[21px] absolute min-h-[570px] max-h-[809px] h-[calc(100vh-160px)] top-[32px] left-[517px] overflow-hidden resize-col"
      />
    </div>
  )
}
export default Editor
