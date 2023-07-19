import { componentItem } from '../index'
import { mapJsxPx, getAttrValue } from '@/utils/tools'

const infoBox: componentItem = {
  label: '活动说明',
  key: 'infoBox',
  icon: () => <></>,
  editor: (style, attr) => {
    return (
      <mat-infobox
        style={mapJsxPx(style)}
        activity-id={getAttrValue(attr['activity-id'])}
      ></mat-infobox>
    )
  },
  position: {
    width: 80,
    height: 40,
    zIndex: 10
  },
  props: {
    style: {},
    attr: {}
  },
  event: {},
  animation: { disable: true }
}

export default infoBox
