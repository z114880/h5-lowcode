import { FC, useContext, memo } from 'react'
import { SchemaContext } from '@/utils/context'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

type propsType = {
  label: string
  icon: string
  name: string
  borderB?: boolean
}
const MaterialItem: FC<propsType> = (props) => {
  const { label, name, icon, borderB = false } = props
  const { dispatch } = useContext(SchemaContext)
  const onDragStart = (name: string) => {
    return () => {
      dispatch({
        type: 'setDragging',
        payload: name
      })
    }
  }
  const { t } = useTranslation()

  return (
    <div
      className={classNames(
        'flex-1 max-w-[100px] h-[120px] flex flex-col border-r border-gray-200 flex justify-center items-center overflow-hidden',
        borderB && 'border-b'
      )}
    >
      <div
        onDragStart={onDragStart(name)}
        draggable
        className="border-gray-200 flex flex-col items-center justify-center"
      >
        <img className="block w-[56px] h-[56px] select-none object-contain" src={icon} alt="" />
        <div className="flex-1 text-center text-sm">{t('leftPannel.' + label)}</div>
      </div>
    </div>
  )
}

export default memo(MaterialItem)
