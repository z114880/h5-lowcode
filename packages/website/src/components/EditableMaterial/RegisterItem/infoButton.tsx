import buttonIcon from '@/assets/images/materialIcon/button.png'
import { componentItem } from '../index'
import MaterialItem from '../MaterialItem'
import { mapJsxPx, getAttrValue } from '@/utils/tools'

const infoButton: componentItem = {
  label: '活动说明按钮',
  key: 'infoButton',
  icon: (borderB?: boolean) => (
    <MaterialItem borderB={borderB} icon={buttonIcon} label="活动说明按钮" name="infoButton" />
  ),
  editor: (style: Record<string, any>, attr: Record<string, any>) => (
    <mat-infobutton style={mapJsxPx(style)}>{getAttrValue(attr['text'])}</mat-infobutton>
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
      活动说明弹窗名称: {
        type: 'selectDialog',
        value: ''
      },
      text: ''
    }
  },
  event: { disable: true },
  animation: { disable: true }
}

export default infoButton
