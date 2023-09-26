import { containerType, pageConfigType } from '../../../../types/Schema'
import { jsx2css, dialogReg, getAttrValue, layoutReg, getRandomString } from '../utils/index'
import BlockBuilder from './blockBuilder'
export default class ContainerBuilder {
  options: { config: pageConfigType }
  Block: BlockBuilder
  animationArr: { className: string; animationClassName: string; triggerMode: string }[]
  cssStr: string
  constructor(options: { config: pageConfigType }) {
    this.options = options
    this.Block = new BlockBuilder()
    this.animationArr = []
    this.cssStr = ''
  }
  private getCss = (container: containerType) => {
    if (container) {
      const css = jsx2css({
        ...container.props.style,
        ...container.position
      })
      const name = getRandomString(6)
      this.cssStr += `.${name} {${css}}`
      return `class="${name}"`
    }
    return ''
  }
  private getAttrsStr = (container: containerType) => {
    let attrStr = ''
    for (const attr in container.props.attr) {
      if (getAttrValue(attr)) {
        attrStr += `${attr}="${
          typeof getAttrValue(container.props.attr[attr]) === 'string' ||
          typeof getAttrValue(container.props.attr[attr]) === 'number'
            ? getAttrValue(container.props.attr[attr])
            : ''
        }"`
      }
    }
    return attrStr
  }
  private getContainerTag = (container: containerType) => {
    if (container.key === 'showMoreLayout') {
      return 'mat-baselayout'
    }
    return `mat-${container.key.toLowerCase()}`
  }
  public builid(container: containerType) {
    const BlockItem = this.Block.build(container.blocks)
    this.cssStr += this.Block.cssStr
    this.animationArr = this.Block.animationArr
    if (layoutReg.test(container.key)) {
      const containerClass = this.getCss(container)
      return `\n<${this.getContainerTag(container)} ${this.getAttrsStr(
        container
      )} ${containerClass}>${BlockItem.trim() && BlockItem + '\n'}</${this.getContainerTag(
        container
      )}>`
    } else if (dialogReg.test(container.key)) {
      const dialogClass = this.getCss(container)
      return `\n<mat-dialog ${dialogClass} show="false" style="display:none;" name="${container.name}" >${BlockItem}\n</mat-dialog>`
    }
  }
}
