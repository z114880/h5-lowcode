import { FC, memo } from 'react'
type propsType = {
  onEnter: BaseFunction
  onLeave: BaseFunction
  onSetCurrentAnimate: BaseFunction
}
const ChooseAnimation: FC<propsType> = (props) => {
  const { onEnter, onLeave, onSetCurrentAnimate } = props

  const AnimationItem = (name: string) => (
    <div
      onMouseEnter={onEnter(name)}
      onMouseLeave={onLeave}
      onClick={onSetCurrentAnimate(name)}
      className="w-24 h-10 p-2 rounded text-center overflow-hidden flex items-center leading-tight justify-center bg-[#1677ff] hover:bg-[rgb(30,140,250)] text-white transition duration-300 cursor-pointer break-all"
    >
      {name}
    </div>
  )
  return (
    <div className="w-full flex gap-y-5 gap-x-5 flex-wrap mb-4">
      {AnimationItem('bounce')}
      {AnimationItem('flash')}
      {AnimationItem('headShake')}
      {AnimationItem('jello')}
      {AnimationItem('pulse')}
      {AnimationItem('rubberBand')}
      {AnimationItem('heartBeat')}
      {AnimationItem('shakeX')}
      {AnimationItem('shakeY')}
      {AnimationItem('swing')}
      {AnimationItem('tada')}
      {AnimationItem('wobble')}
      {AnimationItem('flip')}
    </div>
  )
}
export default memo(ChooseAnimation)
