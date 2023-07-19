import { blockType, positionType, propsType, eventType, animationType } from '@/editor/types'
import { MaterialItemsKeys } from '@/editor/types'

import baseLayout from './RegisterItem/baseLayout'
import blockLayout from './RegisterItem/blockLayout'
import tabLayout from './RegisterItem/tabLayout'
import showMoreLayout from './RegisterItem/showMoreLayout'
import text from './RegisterItem/text'
import input from './RegisterItem/input'
import textArea from './RegisterItem/textArea'
import button from './RegisterItem/button'
import image from './RegisterItem/image'
import infoButton from './RegisterItem/infoButton'
import submitButton from './RegisterItem/submitButton'
import prizeButton from './RegisterItem/prizeButton'
import drawButton from './RegisterItem/drawButton'
import shareButton from './RegisterItem/shareButton'
import exchangeButton from './RegisterItem/exchangeButton'
import infoBox from './RegisterItem/infoBox'
import prizeBox from './RegisterItem/prizeBox'
import loginButton from './RegisterItem/loginButton'
import showMoreButton from './RegisterItem/showMoreButton'
import dialog from './RegisterItem/dialog'
import infoDialog from './RegisterItem/infoDialog'
import prizeDialog from './RegisterItem/prizeDialog'
import virtualGoodsDialog from './RegisterItem/virtualGoodsDialog'
import realGoodsDialog from './RegisterItem/realGoodsDialog'
import timeLeftText from './RegisterItem/timeLeftText'
import closeButton from './RegisterItem/closeButton'
import copyCouponButton from './RegisterItem/copyCouponButton'

export type componentItem = {
  label: string
  key: MaterialItemsKeys
  icon: (borderB?: boolean) => JSX.Element
  editor: (...args: any[]) => JSX.Element
  position: positionType
  props: propsType
  event: eventType
  animation: animationType
  blocks?: blockType[]
  tabAttr?: Record<string, any>
}

function createMaterialList() {
  const componentList: componentItem[] = []
  const componentMap = {} as Record<MaterialItemsKeys, componentItem>

  return {
    componentList,
    componentMap,
    register: (component: componentItem) => {
      componentList.push(component)
      componentMap[component.key] = component
    }
  }
}
export const registerConfig = createMaterialList()

registerConfig.register(baseLayout)

registerConfig.register(tabLayout)

registerConfig.register(blockLayout)

registerConfig.register(showMoreLayout)

registerConfig.register(text)

registerConfig.register(input)

registerConfig.register(textArea)

registerConfig.register(button)

registerConfig.register(image)

registerConfig.register(infoButton)

registerConfig.register(submitButton)

registerConfig.register(drawButton)

registerConfig.register(prizeButton)

registerConfig.register(shareButton)

registerConfig.register(exchangeButton)

registerConfig.register(infoBox)

registerConfig.register(loginButton)

registerConfig.register(showMoreButton)

registerConfig.register(prizeBox)

registerConfig.register(dialog)

registerConfig.register(infoDialog)

registerConfig.register(prizeDialog)

registerConfig.register(virtualGoodsDialog)

registerConfig.register(realGoodsDialog)

registerConfig.register(timeLeftText)

registerConfig.register(closeButton)

registerConfig.register(copyCouponButton)
