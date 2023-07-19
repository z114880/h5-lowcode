import { createElementFromHTML } from '../util/tools.js'

class InfoButton extends HTMLElement {
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
    return ['活动说明弹窗名称']
  }
  attributeChangedCallback() {
    this.shadowRoot.querySelector('.container').onclick = async () => {
      const infoDialog = this.getAttribute('活动说明弹窗名称')
      const dialog = document.getElementsByName(infoDialog)[0]
      dialog.setAttribute('show', 'true')
    }
  }
}
customElements.define('mat-infobutton', InfoButton)
