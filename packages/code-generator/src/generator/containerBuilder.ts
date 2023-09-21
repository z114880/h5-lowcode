import { containerType, pageConfigType } from '../../../../types/Schema'
import { jsx2css, dialogReg, getAttrValue, layoutReg, getRandomString } from '../utils/index'
import BlockBuilder from './blockBuilder'
export default class ContainerBuilder {
  options: { config: pageConfigType }
  Block: BlockBuilder
  constructor(options: { config: pageConfigType }) {
    this.options = options
    this.Block = new BlockBuilder()
  }
  private getCss = (container: containerType) => {
    if (container) {
      const css = jsx2css({
        ...container.props.style,
        ...container.position
      })
      const name = getRandomString(6)
      const cssStr = `.${name} {${css}}`
      return { attr: `class="${name}"`, cssStr }
    }
    return { attr: '', cssStr: '' }
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
    if (layoutReg.test(container.key)) {
      const CssObj = this.getCss(container)
      return {
        element: `\n<${this.getContainerTag(container)} ${this.getAttrsStr(container)} ${
          CssObj.attr
        }>${BlockItem.blockStr.trim() && BlockItem.blockStr + '\n'}</${this.getContainerTag(
          container
        )}>`,
        css: CssObj.cssStr + BlockItem.cssStr
      }
    } else if (dialogReg.test(container.key)) {
      const CssObj = this.getCss(container)
      return {
        element: `\n<mat-dialog ${CssObj.attr} show="false" style="display:none;" name="${container.name}" >${BlockItem.blockStr}\n</mat-dialog>`,
        css: CssObj.cssStr + BlockItem.cssStr
      }
    }
  }
}
