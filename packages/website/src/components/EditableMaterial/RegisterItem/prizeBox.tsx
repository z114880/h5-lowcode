import { componentItem } from '../index'
import { mapJsxPx, getAttrValue } from '@/utils/tools'

const prizeBox: componentItem = {
  label: '我的奖品',
  key: 'prizeBox',
  icon: () => <></>,
  editor: (style, attr) => {
    return (
      <mat-prizebox
        style={mapJsxPx(style)}
        activity-id={getAttrValue(attr['activity-id'])}
      ></mat-prizebox>
    )
  },
  position: {
    width: 80,
    height: 40,
    zIndex: 10,
    position: 'absolute'
  },
  props: {
    style: {},
    attr: { 'activity-id': 102 }
  },
  event: {},
  animation: { disable: true }
}

export default prizeBox
