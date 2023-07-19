import MaterialItem from '../MaterialItem'
import BaseLayout from '../BaseLayout'
import baseLayoutIcon from '@/assets/images/materialIcon/baseLayout.svg'
import { componentItem } from '../index'

const baseLayout: componentItem = {
  label: '基础容器',
  key: 'baseLayout',
  icon: (borderB?: boolean) => (
    <MaterialItem borderB={borderB} icon={baseLayoutIcon} label="基础容器" name="baseLayout" />
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
      backgroundImage: '',
      backgroundColor: '',
      paddingLeft: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      display: 'block',
      flexDirection: '',
      justifyContent: '',
      alignItems: ''
    },
    attr: {}
  },
  event: { disable: true },
  animation: { disable: true }
}

export default baseLayout
