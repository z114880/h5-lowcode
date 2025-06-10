import { createElementFromHTML } from '../util/tools.js'

class ShowMoreButton extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'ShowMoreButtonTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
    this.ShowMoreButtonTemplate = `
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
    const componentNode = createElementFromHTML(this.ShowMoreButtonTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
    this.shadowRoot.querySelector('.container').onclick = async () => {
      const showMoreLayout = document.getElementsByName('showMoreLayout')[0]
      if (showMoreLayout) {
        showMoreLayout.setAttribute('hidden', 'false')
        this.parentElement.style.display = 'none'
      }
    }
  }
  static get observedAttributes() {
    return []
  }
  attributeChangedCallback() {}
}
customElements.define('mat-showmorebutton', ShowMoreButton)
