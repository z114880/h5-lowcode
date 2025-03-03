/* eslint-disable @typescript-eslint/ban-types */
export type MaterialItemsKeys =
  | 'baseLayout'
  | 'tabLayout'
  | 'blockLayout'
  | 'text'
  | 'button'
  | 'closeButton'
  | 'image'
  | 'input'
  | 'textArea'
  | 'tabHeader'
  | 'tabHeaderItem'
  | 'tabHeaderItemActive'
  | 'tabHeaderItemDeActive'
  | 'tabContent'
  | 'drawButton'
  | 'submitButton'
  | 'prizeButton'
  | 'loginButton'
  | 'dialog'
  | 'infoDialog'
  | 'prizeDialog'
  | 'realGoodsDialog'
  | 'virtualGoodsDialog'
  | 'infoBox'
  | 'prizeBox'
  | 'infoButton'
  | 'shareButton'
  | 'exchangeButton'
  | 'timeLeftText'
  | 'showMoreLayout'
  | 'showMoreButton'
  | 'copyCouponButton'

export type positionType = Record<string, any>
export type propsType = {
  style: Record<string, any>
  attr: Record<string, any>
}
export type eventType = { disable?: boolean; action?: string; param?: string }
export type keyframesType = {
  steps: {
    percentNum: string
    effectProperties: Partial<{
      width: string
      height: string
      left: string
      top: string
      opacity: string
      backgroundColor: string
      transform: string
      transformOrigin: string
    }>
  }[]
}
export type animationType = {
  disable?: boolean
  animationName?: string
  animationDuration?: string
  animationIterationCount?: number | string
  animationDelay?: string
  animationFillMode?: string
  triggerMode?: string
  keyframes?: keyframesType
}

export type blockType = {
  key: MaterialItemsKeys
  noDelete?: boolean
  position: positionType
  props: Record<string, any>
  event: eventType
  animation: animationType
  blocks?: blockType[]
}

export type containerType = {
  key: MaterialItemsKeys
  name?: string
  position: positionType
  props: propsType
  event: eventType
  animation: animationType
  blocks: blockType[]
  tabAttr?: Record<string, any>
}

export type schemaType = {
  container: containerType[]
}

export type pageConfigType = Partial<{
  projectName: string
  title: string
  sharedTitle: string
  sharedMessage: string
  sharedLogo: string
  additonalCode: string
}>
