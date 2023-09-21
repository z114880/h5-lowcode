import imageIcon from '@/assets/images/materialIcon/image.svg'
import { componentItem } from '../index'
import MaterialItem from '../MaterialItem'
import { mapJsxPx, getAttrValue } from '@/utils/tools'

const image: componentItem = {
  label: 'image',
  key: 'image',
  icon: (borderB?: boolean) => (
    <MaterialItem borderB={borderB} icon={imageIcon} label="image" name="image" />
  ),
  editor: (style: Record<string, any>, attr: Record<string, any>) => (
    <mat-image style={mapJsxPx(style)} src={getAttrValue(attr['src'])}></mat-image>
  ),
  position: {
    width: 140,
    height: 130,
    zIndex: 10
  },
  props: {
    style: {
      borderRadius: '0',
      position: 'absolute'
    },
    attr: {
      src: ''
    }
  },
  event: { disable: true },
  animation: {
    animationName: '',
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationDelay: '0'
  }
}

export default image
