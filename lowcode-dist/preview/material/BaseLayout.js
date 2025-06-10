import { createElementFromHTML, isInEditor } from '../util/tools.js'

class BaseLayout extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'BaseLayoutTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
    this.BaseLayoutTemplate = `
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
    const componentNode = createElementFromHTML(this.BaseLayoutTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
  }
  static get observedAttributes() {
    return ['hidden']
  }
  attributeChangedCallback() {
    if (!isInEditor()) {
      this.style.display = this.getAttribute('hidden') === 'true' ? 'none' : 'block'
    }
  }
}
customElements.define('mat-baselayout', BaseLayout)
