import { FC, useContext, memo } from 'react'
import { SchemaContext } from '@/utils/context'
import classNames from 'classnames'
type propsType = {
  label: string
  icon: string
  name: string
  borderB?: boolean
}
const MaterialItem: FC<propsType> = (props) => {
  const { label, name, icon, borderB } = props
  const { dispatch } = useContext(SchemaContext)
  const onDragStart = (name: string) => {
    return () => {
      dispatch({
        type: 'setDragging',
        payload: name
      })
    }
  }
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
        <div className="flex-1 text-center text-sm">{label}</div>
      </div>
    </div>
  )
}
MaterialItem.defaultProps = {
  borderB: false
}
export default memo(MaterialItem)
