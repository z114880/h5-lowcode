import buttonIcon from '@/assets/images/materialIcon/button.png'
import { componentItem } from '../index'
import MaterialItem from '../MaterialItem'
import { mapJsxPx, getAttrValue } from '@/utils/tools'

const closeButton: componentItem = {
  label: 'closeButton',
  key: 'closeButton',
  icon: (borderB?: boolean) => (
    <MaterialItem borderB={borderB} icon={buttonIcon} label="closeButton" name="closeButton" />
  ),
  editor: (style: Record<string, any>, attr: Record<string, any>) => (
    <mat-closebutton style={mapJsxPx(style)}>{getAttrValue(attr['text'])}</mat-closebutton>
  ),
  position: {
    width: 80,
    height: 40,
    zIndex: 10
  },
  props: {
    style: {
      backgroundImage: '',
      position: 'absolute'
    },
    attr: {}
  },
  event: { disable: true },
  animation: { disable: true }
}

export default closeButton
