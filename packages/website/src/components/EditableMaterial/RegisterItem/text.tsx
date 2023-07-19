import textIcon from '@/assets/images/materialIcon/text.svg'
import { componentItem } from '../index'
import MaterialItem from '../MaterialItem'
import { mapJsxPx, getAttrValue } from '@/utils/tools'

const text: componentItem = {
  label: '文本',
  key: 'text',
  icon: (borderB?: boolean) => (
    <MaterialItem borderB={borderB} icon={textIcon} label="文本" name="text" />
  ),
  editor: (style: Record<string, any>, attr) => (
    <mat-text style={mapJsxPx(style)}>{getAttrValue(attr['text'])}</mat-text>
  ),
  position: {
    width: 80,
    height: 40,
    zIndex: 10
  },
  props: {
    style: {
      backgroundColor: '#fff',
      fontSize: '16',
      color: '#000',
      lineHeight: '18',
      textAlign: 'left',
      textDecoration: 'none',
      fontWeight: 'normal',
      position: 'absolute'
    },
    attr: { text: '文本' }
  },
  event: {},
  animation: {
    animationName: '',
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationDelay: '0'
  }
}

export default text
