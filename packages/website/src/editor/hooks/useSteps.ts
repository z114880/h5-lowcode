import { useCallback, useContext, useEffect, useState } from 'react'
import { SchemaContext } from '@/utils/context'

export default function useSteps() {
  const { state, dispatch } = useContext(SchemaContext)
  const { operationQueue, pointer } = state
  const [enableUndo, setEnableUndo] = useState(false)
  const [enableRedo, setEnableRedo] = useState(false)
  //撤销
  const undo = useCallback(() => {
    dispatch({
      type: 'undo'
    })
  }, [])
  //恢复
  const redo = useCallback(() => {
    dispatch({
      type: 'redo'
    })
  }, [])
  useEffect(() => {
    if (pointer === 0) setEnableRedo(false)
    else setEnableRedo(true)
    if (operationQueue.length - 1 === pointer) setEnableUndo(false)
    else setEnableUndo(true)
  }, [operationQueue, pointer])
  return { undo, redo, enableUndo, enableRedo }
}
