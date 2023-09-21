import textIcon from '@/assets/images/materialIcon/text.svg'
import { componentItem } from '../index'
import MaterialItem from '../MaterialItem'
import { mapJsxPx, getAttrValue } from '@/utils/tools'

const timeLeftText: componentItem = {
  label: 'timeLeft',
  key: 'timeLeftText',
  icon: (borderB?: boolean) => (
    <MaterialItem borderB={borderB} icon={textIcon} label="timeLeft" name="timeLeftText" />
  ),
  editor: (style: Record<string, any>, attr) => (
    <mat-timelefttext name={getAttrValue(attr['name'])} style={mapJsxPx(style)}></mat-timelefttext>
  ),
  position: {
    width: 200,
    height: 40,
    zIndex: 10
  },
  props: {
    style: {
      backgroundColor: '#fff',
      fontSize: '16',
      color: '#000',
      lineHeight: '18',
      textAlign: 'center',
      fontWeight: 'normal',
      position: 'absolute'
    },
    attr: {
      name: {
        type: 'disabled',
        value: 'timeLeft'
      },
      'activity-id': ''
    }
  },
  event: { disable: true },
  animation: {
    disable: true
  }
}
export default timeLeftText
