import buttonIcon from '@/assets/images/materialIcon/button.png'
import { componentItem } from '../index'
import MaterialItem from '../MaterialItem'
import { mapJsxPx, getAttrValue } from '@/utils/tools'

const button: componentItem = {
  label: '按钮',
  key: 'button',
  icon: (borderB?: boolean) => (
    <MaterialItem borderB={borderB} icon={buttonIcon} label="按钮" name="button" />
  ),
  editor: (style: Record<string, any>, attr: Record<string, any>) => (
    <mat-button style={mapJsxPx(style)}>{getAttrValue(attr['text'])}</mat-button>
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
      position: 'absolute',
      paddingLeft: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      marginLeft: 0,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0
    },
    attr: {
      text: ''
    }
  },
  event: {},
  animation: {
    animationName: '',
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationDelay: '0'
  }
}

export default button
