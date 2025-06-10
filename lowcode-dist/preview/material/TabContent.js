import { createElementFromHTML } from '../util/tools.js'

class TabContent extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'TabContentTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
    this.TabContentTemplate = `
    <template>
      <style>
        .container {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          text-decoration: inherit;
          
        }
      </style>
      <div class="container">
        <slot name="content"/>
      </div>
    </template>`
    //采用shadow-dom
    const componentNode = createElementFromHTML(this.TabContentTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
  }
}
customElements.define('mat-tabcontent', TabContent)
