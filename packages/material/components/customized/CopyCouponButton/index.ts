import { createElementFromHTML, copyToClipBoard } from '../../../utils/tools'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-copycouponbutton': any
    }
  }
}

class CopyCouponButton extends HTMLElement {
  CopyCouponButtonTemplate: string
  constructor() {
    super()
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
    const componentNode = createElementFromHTML(
      this.CopyCouponButtonTemplate
    ) as HTMLTemplateElement

    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
    ;(this.shadowRoot!.querySelector('.container') as HTMLElement).onclick = async () => {
      const parentElement = this.parentElement!
      const cxCouponText = parentElement.querySelector("mat-text[name='coupon']")!
      copyToClipBoard(cxCouponText.innerHTML)
    }
  }
  static get observedAttributes() {
    return []
  }
  attributeChangedCallback() {}
}

customElements.define('mat-copycouponbutton', CopyCouponButton)
