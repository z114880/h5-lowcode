import { createElementFromHTML } from '../util/tools.js'

class TabHeaderItemActive extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'TabHeaderItemActiveTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
    this.TabHeaderItemActiveTemplate = `
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
    const componentNode = createElementFromHTML(this.TabHeaderItemActiveTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
  }
}
customElements.define('mat-tabheaderitemactive', TabHeaderItemActive)
