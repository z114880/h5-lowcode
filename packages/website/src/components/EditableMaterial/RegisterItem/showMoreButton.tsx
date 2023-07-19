import buttonIcon from '@/assets/images/materialIcon/button.png'
import { componentItem } from '../index'
import MaterialItem from '../MaterialItem'
import { mapJsxPx, getAttrValue } from '@/utils/tools'

const showMoreButton: componentItem = {
  label: '显示更多按钮',
  key: 'showMoreButton',
  icon: (borderB?: boolean) => (
    <MaterialItem borderB={borderB} icon={buttonIcon} label="显示更多按钮" name="showMoreButton" />
  ),
  editor: (style: Record<string, any>, attr: Record<string, any>) => (
    <mat-showmorebutton style={mapJsxPx(style)}>{getAttrValue(attr['text'])}</mat-showmorebutton>
  ),
  position: {
    width: 200,
    height: 40,
    zIndex: 10
  },
  props: {
    style: {
      backgroundImage: '',
      backgroundColor: '',
      fontSize: '16',
      color: '#000',
      lineHeight: '18',
      textAlign: 'center',
      textDecoration: 'none',
      borderRadius: '0',
      position: 'absolute'
    },
    attr: {
      text: ''
    }
  },
  event: { disable: true },
  animation: { disable: true }
}

export default showMoreButton
