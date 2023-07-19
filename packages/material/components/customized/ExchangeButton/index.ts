import { createElementFromHTML, useToast } from '../../../utils/tools'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-exchangebutton': any
    }
  }
}

class ExchangeButton extends HTMLElement {
  ExchangeButtonTemplate: string
  constructor() {
    super()
    this.ExchangeButtonTemplate = `
    <template>
      <style>
        .container {
          display:block;
          width: 100%;
          height: 100%;
          position: relative;
          cursor: pointer;
          text-decoration: inherit;
        }
      </style>
    
      <div class="container">
        <slot></slot>
      </div>
     </template>`

    //采用shadow-dom
    const componentNode = createElementFromHTML(this.ExchangeButtonTemplate) as HTMLTemplateElement

    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
    ;(this.shadowRoot!.querySelector('.container') as HTMLElement).onclick = async () => {
      const activityId = this.getAttribute('activity-id')
      if (activityId) {
        useToast('兑换成功')
      } else {
        useToast('积分兑换无活动ID')
      }
    }
  }
  static get observedAttributes() {
    return []
  }
  attributeChangedCallback() {}
}

customElements.define('mat-exchangebutton', ExchangeButton)
