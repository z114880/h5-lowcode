import React, { useCallback, Dispatch, useMemo } from 'react'
import { focusingType } from '@/utils/context'
import { contextMenu } from 'react-contexify'

const useFocus = (
  dispatch: Dispatch<{ type: string; payload: any }>,
  focusing: focusingType,
  type: string,
  containerIndex: number,
  blockIndex: number[]
) => {
  const isFocusing = useMemo((): boolean => {
    if (!focusing) return false
    if (focusing.key !== type) return false
    if (focusing.containerIndex !== containerIndex) return false
    if (blockIndex.length > 0 && JSON.stringify(focusing.blockIndex) !== JSON.stringify(blockIndex))
      return false
    return true
  }, [focusing, containerIndex, blockIndex])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      contextMenu.hideAll()
      e.stopPropagation()
      if (!window.enableClick) return
      dispatch({
        type: 'setFocusing',
        payload: {
          key: type,
          containerIndex: containerIndex,
          blockIndex: blockIndex.length > 0 ? blockIndex : []
        }
      })
    },
    [containerIndex, blockIndex]
  )
  return {
    isFocusing,
    handleClick
  }
}
export default useFocus
