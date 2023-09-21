import { animationType, blockType, eventType } from '../../../../types/Schema'
import { jsx2css, getAttrValue, getRandomString } from '../utils/index'
export default class BlockBuilder {
  constructor() {}
  private getEventFunc = (event: eventType) => {
    if (!event.action) return null
    if (event.disable) return null
    return `${event.action}${event.param ? `('${event.param}')` : '()'}`
  }
  private getEventStr = (event: string | null) => {
    if (event) {
      return `onclick="${event}"`
    }
    return ''
  }
  private getCss = (block: blockType) => {
    if (block) {
      let animation: animationType = {}
      let keyframesStr = ''
      const randomKeyframsName = getRandomString(6)
      if (!block.animation.disable) {
        if (block.animation.animationName) {
          animation = { ...block.animation }
          delete animation.keyframes
          delete animation.triggerMode
        }
        if (block.animation.animationName === '自定义动效') {
          animation.animationName = randomKeyframsName
          keyframesStr = `@keyframes ${randomKeyframsName} {
            ${
              block.animation.keyframes?.steps
                .map((val) => {
                  return `${val.percentNum} {
                    ${jsx2css(val.effectProperties)}
                  }`
                })
                .join('') || ''
            }
          }`
        }
      }
      const css = jsx2css({
        ...block.props.style,
        ...block.position,
        ...animation
      })
      const name = getRandomString(6)
      const cssStr = `${keyframesStr}\n .${name} {${css}}`
      return { attr: `class="${name}"`, cssStr }
    }
    return { attr: '', cssStr: '' }
  }
  private getSlotStr = () => {
    return `slot="content"`
  }
  private getChildrenStr = (block: blockType) => {
    if (block.blocks) {
      const buildElement = this.build(block.blocks)
      return { element: buildElement.blockStr, css: buildElement.cssStr }
    }
    return { element: '', css: '' }
  }
  private getAttrTextStr = (block: blockType) => {
    if (getAttrValue(block.props.attr['text'])) {
      return getAttrValue(block.props.attr['text'])
    }
    return ''
  }
  private getAttrsStr = (block: blockType) => {
    let attrStr = ''
    for (const attr in block.props.attr) {
      if (getAttrValue(attr)) {
        if (attr === 'text') continue
        attrStr += `${attr}="${
          typeof getAttrValue(block.props.attr[attr]) === 'string' ||
          typeof getAttrValue(block.props.attr[attr]) === 'number'
            ? getAttrValue(block.props.attr[attr])
            : ''
        }"`
      }
    }
    return attrStr
  }
  private getblockTag = (block: blockType) => {
    return `mat-${block.key.toLowerCase()}`
  }
  private getBlockItem = (block: blockType) => {
    const event = this.getEventFunc(block.event)
    if (
      block.key === 'baseLayout' ||
      block.key === 'blockLayout' ||
      block.key === 'tabHeader' ||
      block.key === 'tabHeaderItem' ||
      block.key === 'tabContent' ||
      block.key === 'tabHeaderItemActive' ||
      block.key === 'tabHeaderItemDeActive'
    ) {
      const CssObj = this.getCss(block)
      const ChildrenStr = this.getChildrenStr(block)
      return {
        element: `\n<${this.getblockTag(block)} ${CssObj.attr} ${this.getAttrsStr(
          block
        )} ${this.getEventStr(event)} ${this.getSlotStr()}>${
          ChildrenStr.element.trim() && ChildrenStr.element + '\n'
        }</${this.getblockTag(block)}>`,
        css: CssObj.cssStr + ChildrenStr.css
      }
    } else {
      const CssObj = this.getCss(block)
      return {
        element: `\n<${this.getblockTag(block)} ${CssObj.attr} ${this.getEventStr(
          event
        )} ${this.getAttrsStr(block)} ${this.getSlotStr()}>${this.getAttrTextStr(
          block
        )}</${this.getblockTag(block)}>`,
        css: CssObj.cssStr
      }
    }
  }
  public build(blocks?: blockType[]) {
    let blockStr = ''
    let cssStr = ''
    for (let i = 0; i < blocks!.length; i++) {
      const blockItem = this.getBlockItem(blocks![i])
      blockStr += blockItem.element
      cssStr += blockItem.css
    }
    return { blockStr, cssStr }
  }
}
