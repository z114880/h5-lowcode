import { Dispatch, useState, useEffect, useCallback } from 'react'
import { schemaType } from '@/editor/types'
import { focusingType } from '@/utils/context'
import { getBlockElementByIndexes } from '@/editor/utils/tools'
import deepcopy from 'deepcopy'
import { message } from 'antd'

const useHandleZIndex = (
  schema: schemaType,
  dispatch: Dispatch<{ type: string; payload: any }>,
  focusing: focusingType
) => {
  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    if (focusing === null) setIsActive(false)
    //@todo 待优化
    else if (focusing.key === 'baseLayout' || focusing.key === 'tabLayout') setIsActive(false)
    else setIsActive(true)
  }, [focusing])

  const enableHandleZIndex = useCallback(
    (containerIndex?: number, blockIndex?: number[]) => {
      if (containerIndex !== undefined && blockIndex !== undefined) {
        const element = getBlockElementByIndexes(schema, containerIndex, blockIndex)
        if (element?.key === 'baseLayout' || element?.key === 'tabLayout') return true
        return false
      }
      return false
    },
    [schema]
  )

  const onAddZIndex = useCallback(
    (t: BaseFunction) => {
      if (!isActive) return
      const newSchema = deepcopy(schema)
      const newElement = getBlockElementByIndexes(
        newSchema,
        focusing!.containerIndex,
        focusing!.blockIndex
      )
      if (newElement === 'notFound') {
        dispatch({
          type: 'setFocusing',
          payload: null
        })
        return
      }
      newElement.position.zIndex++
      message.success(t('toast.currentZIndex') + newElement.position.zIndex)
      dispatch({
        type: 'setSchema',
        payload: newSchema
      })
      dispatch({
        type: 'pushQueue',
        payload: newSchema
      })
    },
    [isActive, focusing, schema]
  )

  const onAddZIndexWithouFocusing = useCallback(
    (t: BaseFunction, containerIndex: number, blockIndex: number[]) => {
      if (!isActive) {
        message.warning(t('toast.canNotSetZindex'))
        return
      }
      const newSchema = deepcopy(schema)
      const newElement = getBlockElementByIndexes(newSchema, containerIndex, blockIndex)
      if (newElement === 'notFound') {
        dispatch({
          type: 'setFocusing',
          payload: null
        })
        return
      }
      newElement.position.zIndex++
      message.success(t('toast.currentZIndex') + newElement.position.zIndex)
      dispatch({
        type: 'setSchema',
        payload: newSchema
      })
      dispatch({
        type: 'pushQueue',
        payload: newSchema
      })
    },
    [schema]
  )

  const onMinusZIndex = useCallback(
    (t: BaseFunction) => {
      if (!isActive) return
      const newSchema = deepcopy(schema)
      const newElement = getBlockElementByIndexes(
        newSchema,
        focusing!.containerIndex,
        focusing!.blockIndex
      )
      if (newElement === 'notFound') {
        dispatch({
          type: 'setFocusing',
          payload: null
        })
        return
      }
      if (newElement.position.zIndex > 1) {
        newElement.position.zIndex--
        message.success(t('toast.currentZIndex') + newElement.position.zIndex)
      } else {
        message.error(t('toast.minimalZIndex'))
      }
      dispatch({
        type: 'setSchema',
        payload: newSchema
      })
      dispatch({
        type: 'pushQueue',
        payload: newSchema
      })
    },
    [isActive, focusing, schema]
  )

  const onMinusZIndexWithoutFocuing = useCallback(
    (t: BaseFunction, containerIndex: number, blockIndex: number[]) => {
      if (!isActive) {
        message.warning(t('toast.canNotSetZindex'))
        return
      }
      const newSchema = deepcopy(schema)
      const newElement = getBlockElementByIndexes(newSchema, containerIndex, blockIndex)
      if (newElement === 'notFound') {
        dispatch({
          type: 'setFocusing',
          payload: null
        })
        return
      }
      if (newElement.position.zIndex > 1) {
        newElement.position.zIndex--
        message.success(t('toast.currentZIndex') + newElement.position.zIndex)
      } else {
        message.error(t('toast.minimalZIndex'))
      }
      dispatch({
        type: 'setSchema',
        payload: newSchema
      })
      dispatch({
        type: 'pushQueue',
        payload: newSchema
      })
    },
    [schema]
  )

  return {
    isActive,
    onAddZIndex,
    onMinusZIndex,
    onAddZIndexWithouFocusing,
    onMinusZIndexWithoutFocuing,
    enableHandleZIndex
  }
}

export default useHandleZIndex
