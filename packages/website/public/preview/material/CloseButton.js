import { createElementFromHTML } from '../util/tools.js'

class CloseButton extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'CloseButtonTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
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
    const componentNode = createElementFromHTML(this.CloseButtonTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
    this.shadowRoot.querySelector('.container').onclick = async () => {
      const dialog = this.parentElement.parentElement
      dialog && dialog.setAttribute('show', 'false')
    }
  }
  static get observedAttributes() {
    return []
  }
  attributeChangedCallback() {}
}
customElements.define('mat-closebutton', CloseButton)
