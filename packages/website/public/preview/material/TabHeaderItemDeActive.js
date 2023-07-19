import { createElementFromHTML } from '../util/tools.js'

class tabHeaderItemDeActive extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'tabHeaderItemDeActiveTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
    this.tabHeaderItemDeActiveTemplate = `
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
    const componentNode = createElementFromHTML(this.tabHeaderItemDeActiveTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
  }
}
customElements.define('mat-tabheaderitemdeactive', tabHeaderItemDeActive)
