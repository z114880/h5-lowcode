import { animationType, blockType, eventType } from '../../../../types/Schema'
import { jsx2css, getAttrValue, getRandomString } from '../utils/index'
export default class BlockBuilder {
  animationArr: { className: string; animationClassName: string; triggerMode: string }[]
  cssStr: string
  constructor() {
    this.animationArr = []
    this.cssStr = ''
  }
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
        ...block.position
      })
      const name = getRandomString(6)
      this.cssStr += `.${name} {${css}}`

      if (block.animation.animationName) {
        const animationClassName = getRandomString(6)
        this.animationArr.push({
          className: name,
          animationClassName,
          triggerMode: block.animation.triggerMode || 'default'
        })
        const animationCss = jsx2css({ ...animation })
        this.cssStr += `${keyframesStr}\n .${animationClassName} {${animationCss}}`
      }
      return `class="${name}"`
    }
    return ''
  }
  private getSlotStr = () => {
    return `slot="content"`
  }
  private getChildrenStr = (block: blockType) => {
    if (block.blocks) {
      return this.build(block.blocks)
    }
    return ''
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
      const cssStr = this.getCss(block)
      const ChildrenStr = this.getChildrenStr(block)
      return `\n<${this.getblockTag(block)} ${cssStr} ${this.getAttrsStr(block)} ${this.getEventStr(
        event
      )} ${this.getSlotStr()}>${ChildrenStr.trim() && ChildrenStr + '\n'}</${this.getblockTag(
        block
      )}>`
    } else {
      const cssStr = this.getCss(block)
      return `\n<${this.getblockTag(block)} ${cssStr} ${this.getEventStr(event)} ${this.getAttrsStr(
        block
      )} ${this.getSlotStr()}>${this.getAttrTextStr(block)}</${this.getblockTag(block)}>`
    }
  }
  public build(blocks?: blockType[]) {
    let blockStr = ''
    for (let i = 0; i < blocks!.length; i++) {
      const blockItem = this.getBlockItem(blocks![i])
      blockStr += blockItem
    }
    return blockStr
  }
}
