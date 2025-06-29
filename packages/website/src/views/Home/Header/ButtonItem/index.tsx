import classNames from 'classnames'
import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
type PropsType = {
  name: string
  icon: JSX.Element
  actived?: boolean
  event?: BaseFunction
}

const ButtonItem: FC<PropsType> = ({ name, icon, event, actived = true }) => {
  const { t } = useTranslation()
  const transEvent = () => {
    if (event) event!(t)
  }
  return (
    <div
      onClick={actived ? transEvent : undefined}
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
export default memo(ButtonItem)
