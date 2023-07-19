import { FC, memo } from 'react'
import { registerConfig } from '@/components/EditableMaterial'
import classNames from 'classnames'
const Base: FC = () => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const Holder = (borderB?: boolean, borderR?: boolean) => (
    <div
      className={classNames(
        'flex-1 max-w-[100px] h-[120px] flex flex-col border-gray-200 flex justify-center items-center overflow-hidden',
        borderB && 'border-b',
        borderR && 'border-r'
      )}
    ></div>
  )

  return (
    <div className="w-[300px] h-[calc(100vh-320px)] overflow-y-scroll shadow-md">
      <h2 className="border-b border-r border-gray-200 mb-0 text-center h-9 leading-9">基础容器</h2>
      <div className="flex flex-row flex-wrap">
        {registerConfig.componentMap['baseLayout'].icon()}
        {registerConfig.componentMap['tabLayout'].icon()}
        {registerConfig.componentMap['blockLayout'].icon()}
      </div>
      <h2 className="border-b border-r border-t border-gray-200 mb-0 text-center h-9 leading-9">
        基础组件
      </h2>
      <div className="flex flex-row flex-wrap">
        {registerConfig.componentMap['button'].icon(true)}
        {registerConfig.componentMap['text'].icon(true)}
        {registerConfig.componentMap['input'].icon(true)}
      </div>
      <div className="flex flex-row flex-wrap">
        {registerConfig.componentMap['textArea'].icon(true)}
        {registerConfig.componentMap['image'].icon()}
      </div>
      <div className="border-t border-gray-200"></div>
    </div>
  )
}
export default memo(Base)
