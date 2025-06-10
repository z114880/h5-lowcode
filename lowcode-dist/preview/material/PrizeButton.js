import { createElementFromHTML } from '../util/tools.js'

class PrizeButton extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'PrizeButtonTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
    this.PrizeButtonTemplate = `
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
    const componentNode = createElementFromHTML(this.PrizeButtonTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
    this.shadowRoot.querySelector('.container').onclick = async () => {
      const myPrizeDialog = this.getAttribute('我的奖品弹窗名称')
      const dialog = document.getElementsByName(myPrizeDialog)[0]
      dialog.setAttribute('show', 'true')
    }
  }
  static get observedAttributes() {
    return []
  }
  attributeChangedCallback() {}
}
customElements.define('mat-prizebutton', PrizeButton)
