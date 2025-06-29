import { FC, memo } from 'react'
import classnames from 'classnames'
type propsType = {
  isFocusing: boolean
  left?: boolean
  top?: boolean
  right?: boolean
  bottom?: boolean
  slot?: string
}
const BlockBorder: FC<propsType> = ({
  isFocusing,
  left = true,
  top = true,
  right = true,
  bottom = true,
  slot
}) => {
  return (
    <>
      {right && (
        <div
          slot={slot || undefined}
          className={classnames(
            isFocusing ? 'border-solid' : 'border-dashed',
            'absolute right-0 top-0 h-full w-0 border-r border-blue-200 z-[1]'
          )}
        />
      )}
      {top && (
        <div
          slot={slot || undefined}
          className={classnames(
            isFocusing ? 'border-solid' : 'border-dashed',
            'absolute top-0 left-0 h-0 w-full border-t border-blue-200 z-[1]'
          )}
        />
      )}
      {left && (
        <div
          slot={slot || undefined}
          className={classnames(
            isFocusing ? 'border-solid' : 'border-dashed',
            'absolute left-0 top-0 h-full w-0 border-l border-blue-200 z-[1]'
          )}
        />
      )}
      {bottom && (
        <div
          slot={slot || undefined}
          className={classnames(
            isFocusing ? 'border-solid' : 'border-dashed',
            'absolute bottom-0 left-0 h-0 w-full border-b border-blue-200 z-[1]'
          )}
        />
      )}
    </>
  )
}

export default memo(BlockBorder)
