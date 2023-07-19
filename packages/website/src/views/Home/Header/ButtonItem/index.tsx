import classNames from 'classnames'
import { FC, memo } from 'react'

type PropsType = {
  name: string
  icon: JSX.Element
  actived?: boolean
  event?: BaseFunction
}

const ButtonItem: FC<PropsType> = (props) => {
  const { name, icon, event, actived } = props
  return (
    <div
      onClick={actived ? event : undefined}
      className={classNames(
        'h-26 flex flex-col justify-center items-center cursor-pointer',
        actived ? 'text-current' : 'text-gray-400'
      )}
    >
      <div className="w-8 h-8 flex justify-center items-center text-lg">{icon}</div>
      <div className="w-18 h-18 text-xs text-center">{name}</div>
    </div>
  )
}
ButtonItem.defaultProps = {
  actived: true
}
export default memo(ButtonItem)
