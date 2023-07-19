import buttonIcon from '@/assets/images/materialIcon/button.png'
import { componentItem } from '../index'
import MaterialItem from '../MaterialItem'
import { mapJsxPx, getAttrValue } from '@/utils/tools'

const drawButton: componentItem = {
  label: '抽奖按钮',
  key: 'drawButton',
  icon: (borderB?: boolean) => (
    <MaterialItem borderB={borderB} icon={buttonIcon} label="抽奖按钮" name="drawButton" />
  ),
  editor: (style: Record<string, any>, attr: Record<string, any>) => (
    <mat-drawbutton style={mapJsxPx(style)}>{getAttrValue(attr['text'])}</mat-drawbutton>
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
      中奖后的实物弹窗名称: {
        type: 'selectDialog',
        value: ''
      },
      中奖后的虚拟弹窗名称: {
        type: 'selectDialog',
        value: ''
      },
      text: ''
    }
  },
  event: { disable: true },
  animation: { disable: true }
}

export default drawButton
