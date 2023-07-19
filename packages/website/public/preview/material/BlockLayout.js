import { createElementFromHTML, isInEditor } from '../util/tools.js'

class BlockLayout extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'BlockLayoutTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
    Object.defineProperty(this, 'flexCss', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
    this.BlockLayoutTemplate = `
    <template>
      <style>
        .container {
          display:block;
          width: 100%;
          height: 100%;
          position: relative;
          text-decoration: inherit;
          display: inherit;
          flex-direction: inherit;
          justify-content: inherit;
          align-items: inherit;
        }
      </style>
    
      <div class="container">
        <slot name="content"/>
      </div>
    </template>`
    //采用shadow-dom
    const componentNode = createElementFromHTML(this.BlockLayoutTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
    this.flexCss = ['display', 'flex-direction', 'justify-content', 'aliItems']
  }
  static get observedAttributes() {
    return ['hidden', 'style']
  }
  attributeChangedCallback() {
    if (!isInEditor()) {
      this.style.display = this.getAttribute('hidden') === 'true' ? 'none' : 'block'
    }
  }
}
customElements.define('mat-blocklayout', BlockLayout)
