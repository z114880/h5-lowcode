import MaterialItem from '../MaterialItem'
import BaseLayout from '../BaseLayout'
import baseLayoutIcon from '@/assets/images/materialIcon/baseLayout.svg'
import { componentItem } from '../index'

const showMoreLayout: componentItem = {
  label: '显示更多容器',
  key: 'showMoreLayout',
  icon: (borderB?: boolean) => (
    <MaterialItem
      borderB={borderB}
      icon={baseLayoutIcon}
      label="显示更多容器"
      name="showMoreLayout"
    />
  ),
  editor: (containerIndex: number) => (
    <BaseLayout
      blockIndex={[]}
      containerIndex={containerIndex}
      key={containerIndex}
      bottom={true}
    />
  ),
  position: {
    position: 'relative',
    height: 600,
    zIndex: 10
  },
  props: {
    style: {
      backgroundImage: ''
    },
    attr: {
      name: {
        type: 'disabled',
        value: 'showMoreLayout'
      },
      hidden: {
        type: 'disabled',
        value: 'true'
      }
    }
  },
  event: { disable: true },
  animation: { disable: true }
}
export default showMoreLayout
