import { createElementFromHTML } from '../../../utils/tools'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-prizebutton': any
    }
  }
}

class PrizeButton extends HTMLElement {
  PrizeButtonTemplate: string
  constructor() {
    super()
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
    const componentNode = createElementFromHTML(this.PrizeButtonTemplate) as HTMLTemplateElement

    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
    ;(this.shadowRoot!.querySelector('.container') as HTMLElement).onclick = async () => {
      const myPrizeDialog = this.getAttribute('我的奖品弹窗名称')!
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
