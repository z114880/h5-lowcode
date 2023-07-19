import { FC, memo } from 'react'
import { registerConfig } from '@/components/EditableMaterial'
const Customized: FC = () => {
  return (
    <div className="w-[300px] h-[calc(100vh-320px)] overflow-y-scroll shadow-md">
      <h2 className="border-b border-r border-gray-200 mb-0 text-center h-9 leading-9">业务组件</h2>
      <div className="flex flex-row flex-wrap">
        {registerConfig.componentMap['drawButton'].icon(true)}
        {registerConfig.componentMap['prizeButton'].icon(true)}
        {registerConfig.componentMap['infoButton'].icon(true)}
      </div>
      <div className="flex flex-row flex-wrap">
        {registerConfig.componentMap['loginButton'].icon(true)}
        {registerConfig.componentMap['shareButton'].icon(true)}
        {registerConfig.componentMap['exchangeButton'].icon(true)}
      </div>
      <div className="flex flex-row flex-wrap">
        {registerConfig.componentMap['timeLeftText'].icon(true)}
        {registerConfig.componentMap['showMoreButton'].icon(true)}
        {registerConfig.componentMap['showMoreLayout'].icon(true)}
      </div>
    </div>
  )
}
export default memo(Customized)
