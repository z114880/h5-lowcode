import buttonIcon from '@/assets/images/materialIcon/button.png'
import { componentItem } from '../index'
import MaterialItem from '../MaterialItem'
import { mapJsxPx, getAttrValue } from '@/utils/tools'

const shareButton: componentItem = {
  label: 'shareButton',
  key: 'shareButton',
  icon: (borderB?: boolean) => (
    <MaterialItem borderB={borderB} icon={buttonIcon} label="shareButton" name="shareButton" />
  ),
  editor: (style: Record<string, any>, attr: Record<string, any>) => (
    <mat-sharebutton style={mapJsxPx(style)}>{getAttrValue(attr['text'])}</mat-sharebutton>
  ),
  position: {
    width: 80,
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
      'activity-id': '',
      text: ''
    }
  },
  event: { disable: true },
  animation: { disable: true }
}

export default shareButton
