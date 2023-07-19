import { createElementFromHTML } from '../util/tools.js'

class Text extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'TextTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
    this.TextTemplate = `
    <template>
      <style>
        .container {
          width: 100%;
          height: 100%;
          text-decoration: inherit;
        }
      </style>
    
      <div class="container">
        <slot></slot>
      </div>
    </template>`
    const componentNode = createElementFromHTML(this.TextTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
  }
}
customElements.define('mat-text', Text)
