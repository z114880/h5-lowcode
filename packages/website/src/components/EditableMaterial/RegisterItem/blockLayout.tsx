import MaterialItem from '../MaterialItem'
import BlockLayout from '../BlockLayout'
import baseLayoutIcon from '@/assets/images/materialIcon/baseLayout.svg'
import { componentItem } from '../index'

const blockLayout: componentItem = {
  label: 'blockLayout',
  key: 'blockLayout',
  icon: (borderB?: boolean) => (
    <MaterialItem borderB={borderB} icon={baseLayoutIcon} label="blockLayout" name="blockLayout" />
  ),
  editor: (containerIndex: number, blockIndex: number[], key: number) => (
    <BlockLayout
      blockIndex={blockIndex}
      containerIndex={containerIndex}
      key={key}
      slotName="content"
    />
  ),
  position: {
    width: 300,
    height: 300,
    zIndex: 10
  },
  props: {
    style: {
      position: 'absolute',
      backgroundImage: '',
      backgroundColor: '',
      borderRadius: '0',
      paddingLeft: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      marginLeft: 0,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      display: 'block',
      flexDirection: '',
      justifyContent: '',
      alignItems: ''
    },
    attr: {}
  },
  event: { disable: true },
  animation: {
    animationName: '',
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationDelay: '0'
  },
  blocks: []
}

export default blockLayout
