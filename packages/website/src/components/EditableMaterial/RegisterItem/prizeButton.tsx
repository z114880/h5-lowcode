import buttonIcon from '@/assets/images/materialIcon/button.png'
import { componentItem } from '../index'
import MaterialItem from '../MaterialItem'
import { mapJsxPx, getAttrValue } from '@/utils/tools'

const prizeButton: componentItem = {
  label: '我的奖品按钮',
  key: 'prizeButton',
  icon: (borderB?: boolean) => (
    <MaterialItem borderB={borderB} icon={buttonIcon} label="我的奖品按钮" name="prizeButton" />
  ),
  editor: (style: Record<string, any>, attr: Record<string, any>) => (
    <mat-prizebutton style={mapJsxPx(style)}>{getAttrValue(attr['text'])}</mat-prizebutton>
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
      text: '',
      我的奖品弹窗名称: {
        type: 'selectDialog',
        value: ''
      }
    }
  },
  event: { disable: true },
  animation: { disable: true }
}

export default prizeButton
