import buttonIcon from '@/assets/images/materialIcon/button.png'
import { componentItem } from '../index'
import MaterialItem from '../MaterialItem'
import { mapJsxPx, getAttrValue } from '@/utils/tools'

const copyCouponButton: componentItem = {
  label: '复制券码按钮',
  key: 'copyCouponButton',
  icon: (borderB?: boolean) => (
    <MaterialItem
      borderB={borderB}
      icon={buttonIcon}
      label="复制券码按钮"
      name="copyCouponButton"
    />
  ),
  editor: (style: Record<string, any>, attr: Record<string, any>) => (
    <mat-copycouponbutton style={mapJsxPx(style)}>
      {getAttrValue(attr['text'])}
    </mat-copycouponbutton>
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
      text: ''
    }
  },
  event: { disable: true },
  animation: { disable: true }
}

export default copyCouponButton
