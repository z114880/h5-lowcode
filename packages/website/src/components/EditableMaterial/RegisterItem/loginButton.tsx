import buttonIcon from '@/assets/images/materialIcon/button.png'
import { componentItem } from '../index'
import MaterialItem from '../MaterialItem'
import { mapJsxPx } from '@/utils/tools'

const loginButton: componentItem = {
  label: '登录按钮',
  key: 'loginButton',
  icon: (borderB?: boolean) => (
    <MaterialItem borderB={borderB} icon={buttonIcon} label="登录按钮" name="loginButton" />
  ),
  editor: (style: Record<string, any>) => (
    <mat-loginbutton style={mapJsxPx(style)}></mat-loginbutton>
  ),
  position: {
    width: 200,
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
      登录后显示文案: '当前账号：XXX',
      'activity-id': ''
    }
  },
  event: { disable: true },
  animation: {
    disable: true
  }
}
export default loginButton
