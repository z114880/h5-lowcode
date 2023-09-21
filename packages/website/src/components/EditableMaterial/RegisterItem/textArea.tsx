import inputIcon from '@/assets/images/materialIcon/input.png'
import { componentItem } from '../index'
import MaterialItem from '../MaterialItem'
import { mapJsxPx, getAttrValue } from '@/utils/tools'

const input: componentItem = {
  label: 'textarea',
  key: 'textArea',
  icon: (borderB?: boolean) => (
    <MaterialItem borderB={borderB} icon={inputIcon} label="textarea" name="textArea" />
  ),
  editor: (style: Record<string, any>, attr) => (
    <mat-textarea
      name={getAttrValue(attr['name'])}
      placeholder={getAttrValue(attr['placeholder'])}
      style={mapJsxPx(style)}
    ></mat-textarea>
  ),
  position: {
    width: 80,
    height: 40,
    zIndex: 10
  },
  props: {
    style: {
      fontSize: '16',
      color: '#000',
      backgroundColor: 'rgb(229,229,229)',
      borderWidth: '1',
      borderColor: '#000',
      borderStyle: 'solid',
      position: 'absolute'
    },
    attr: {
      placeholder: '请输入',
      name: ''
    }
  },
  event: { disable: true },
  animation: { disable: true }
}

export default input
