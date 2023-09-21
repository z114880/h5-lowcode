import buttonIcon from '@/assets/images/materialIcon/button.png'
import { componentItem } from '../index'
import MaterialItem from '../MaterialItem'
import { mapJsxPx, getAttrValue } from '@/utils/tools'

const exchangeButton: componentItem = {
  label: 'exchangeButton',
  key: 'exchangeButton',
  icon: (borderB?: boolean) => (
    <MaterialItem
      borderB={borderB}
      icon={buttonIcon}
      label="exchangeButton"
      name="exchangeButton"
    />
  ),
  editor: (style: Record<string, any>, attr: Record<string, any>) => (
    <mat-exchangebutton style={mapJsxPx(style)}>{getAttrValue(attr['text'])}</mat-exchangebutton>
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

export default exchangeButton
