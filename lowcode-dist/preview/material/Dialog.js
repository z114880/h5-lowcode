import { createElementFromHTML, isInEditor } from '../util/tools.js'

class Dialog extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'DialogTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
    this.DialogTemplate = `
    <template>
      <style>
        .model {
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>
    
      <div class="model">
        <div class="content">
          <slot name="content">
        </div>
      </div>
    </template>`
    //采用shadow-dom
    const componentNode = createElementFromHTML(this.DialogTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
    //不在编辑状态下
    if (!isInEditor()) {
      this.shadowRoot.querySelector('.model').onclick = () => {
        this.setAttribute('show', 'false')
      }
      this.shadowRoot.querySelector('.content').onclick = (e) => {
        e.stopPropagation()
      }
    }
  }
  static get observedAttributes() {
    return ['show']
  }
  attributeChangedCallback() {
    this.style.display = this.getAttribute('show') === 'true' ? 'block' : 'none'
  }
}
customElements.define('mat-dialog', Dialog)
