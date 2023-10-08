import { Dispatch, useState, useEffect, useCallback } from 'react'
import { schemaType } from '@/editor/types'
import { focusingType } from '@/utils/context'
import { deleteElementByIndexes, getBlockElementByIndexes } from '@/editor/utils/tools'
import deepcopy from 'deepcopy'
import { message } from 'antd'

const useHandleDelete = (
  schema: schemaType,
  dispatch: Dispatch<{ type: string; payload: any }>,
  focusing: focusingType
) => {
  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    let element
    if (focusing) {
      element = getBlockElementByIndexes(schema, focusing?.containerIndex, focusing?.blockIndex)
      if (element === 'notFound')
        dispatch({
          type: 'setFocusing',
          payload: null
        })
    }
    if (focusing === null || (focusing !== null && element.noDelete)) setIsActive(false)
    else setIsActive(true)
  }, [focusing])

  const onDelete = useCallback(() => {
    if (!isActive) return
    const newSchema = deepcopy(schema)
    const deletedSchema = deleteElementByIndexes(
      newSchema,
      focusing!.containerIndex,
      focusing!.blockIndex
    )
    dispatch({
      type: 'setSchema',
      payload: deletedSchema
    })
    dispatch({
      type: 'pushQueue',
      payload: deletedSchema
    })
    dispatch({
      type: 'setFocusing',
      payload: null
    })
  }, [isActive, schema, focusing])

  const onDeleteWithoutFocusing = useCallback(
    (t: BaseFunction, containerIndex?: number, blockIndex?: number[]) => {
      const newSchema = deepcopy(schema)
      let deletedSchema
      if (containerIndex !== undefined && blockIndex !== undefined) {
        const element = getBlockElementByIndexes(schema, containerIndex!, blockIndex!)
        if (element.noDelete) {
          message.warning(t('toast.canNotDeleteElement'))
          return
        }
        deletedSchema = deleteElementByIndexes(newSchema, containerIndex, blockIndex)
      }
      dispatch({
        type: 'setSchema',
        payload: deletedSchema
      })
      dispatch({
        type: 'pushQueue',
        payload: deletedSchema
      })
    },
    [schema]
  )

  const enableDelete = useCallback(
    (containerIndex?: number, blockIndex?: number[]) => {
      if (containerIndex !== undefined && blockIndex !== undefined) {
        const element = getBlockElementByIndexes(schema, containerIndex, blockIndex)
        if (element?.noDelete) {
          return true
        }
        return false
      }
      return false
    },
    [schema]
  )

  return {
    isActive,
    onDelete,
    onDeleteWithoutFocusing,
    enableDelete
  }
}

export default useHandleDelete
