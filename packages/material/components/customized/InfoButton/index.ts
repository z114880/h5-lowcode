import { createElementFromHTML } from '../../../utils/tools'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-infobutton': any
    }
  }
}

class InfoButton extends HTMLElement {
  ButtonTemplate: string
  constructor() {
    super()
    this.ButtonTemplate = `
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
    const componentNode = createElementFromHTML(this.ButtonTemplate) as HTMLTemplateElement

    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
  }
  static get observedAttributes() {
    return ['活动说明弹窗名称']
  }
  attributeChangedCallback() {
    ;(this.shadowRoot!.querySelector('.container') as HTMLElement).onclick = async () => {
      const infoDialog = this.getAttribute('活动说明弹窗名称')!
      const dialog = document.getElementsByName(infoDialog)[0]
      dialog.setAttribute('show', 'true')
    }
  }
}

customElements.define('mat-infobutton', InfoButton)
