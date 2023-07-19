import { createElementFromHTML } from '../../../utils/tools'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-closebutton': any
    }
  }
}

class CloseButton extends HTMLElement {
  CloseButtonTemplate: string
  constructor() {
    super()
    this.CloseButtonTemplate = `
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
    const componentNode = createElementFromHTML(this.CloseButtonTemplate) as HTMLTemplateElement

    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
    ;(this.shadowRoot!.querySelector('.container') as HTMLElement).onclick = async () => {
      const dialog = this.parentElement!.parentElement
      dialog && dialog.setAttribute('show', 'false')
    }
  }
  static get observedAttributes() {
    return []
  }
  attributeChangedCallback() {}
}

customElements.define('mat-closebutton', CloseButton)
