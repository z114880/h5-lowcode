import { createElementFromHTML } from '../util/tools.js'

class TabHeader extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'TabHeaderTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
    this.TabHeaderTemplate = `
    <template>
      <style>
        .container {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          text-decoration: inherit;
          
        }
        .container-inner {
          width: 100%;
          height: 100%;
          display: flex;
          overflow-x: scroll;
        }
        .header-wrap {
          display: flex;
          width: max-content;
        }
      </style>
      <div class="container">
        <div class="container-inner">
          <div class="header-wrap">
            <slot name="content"/>
          </div>
        </div>
        <slot name="header-resizer"/>
      </div>
    </template>`
    //采用shadow-dom
    const componentNode = createElementFromHTML(this.TabHeaderTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
  }
}
customElements.define('mat-tabheader', TabHeader)
