import { createElementFromHTML, copyToClipBoard } from '../util/tools.js'

class CopyCouponButton extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'CopyCouponButtonTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
    this.CopyCouponButtonTemplate = `
    <template>
      <style>
        .container {
          display:block;
          width: 100%;
          height: 100%;
          position: relative;
          text-decoration: inherit;
        }
      </style>
    
      <div class="container">
        <slot></slot>
      </div>
    </template>`
    //采用shadow-dom
    const componentNode = createElementFromHTML(this.CopyCouponButtonTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
    this.shadowRoot.querySelector('.container').onclick = async () => {
      const parentElement = this.parentElement
      const cxCouponText = parentElement.querySelector("mat-text[name='coupon']")
      copyToClipBoard(cxCouponText.innerHTML)
    }
  }
  static get observedAttributes() {
    return []
  }
  attributeChangedCallback() {}
}
customElements.define('mat-copycouponbutton', CopyCouponButton)
