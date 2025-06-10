import { createElementFromHTML, useToast } from '../util/tools.js'

class ExchangeButton extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'ExchangeButtonTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
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
    const componentNode = createElementFromHTML(this.ExchangeButtonTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
    this.shadowRoot.querySelector('.container').onclick = async () => {
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
