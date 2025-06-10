import { createElementFromHTML } from '../util/tools.js'

class Button extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'ButtonTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
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
    const componentNode = createElementFromHTML(this.ButtonTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
  }
  static get observedAttributes() {
    return ['data-style']
  }
  attributeChangedCallback() {
    this.shadowRoot
      .querySelector('.container')
      .setAttribute('style', this.getAttribute('data-style') || '')
  }
}
customElements.define('mat-button', Button)
