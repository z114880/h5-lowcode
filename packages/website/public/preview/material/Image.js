import { createElementFromHTML } from '../util/tools.js'

class Image extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'ImageTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
    this.ImageTemplate = `
    <template>
      <style>
        .container {
          display:block;
          width: 100%;
          height: 100%;
          position: relative;
          text-decoration: inherit;
        }
        .container img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      </style>
    
      <div class="container">
        <img src=""></img>
      </div>
    </template>`
    //采用shadow-dom
    const componentNode = createElementFromHTML(this.ImageTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
  }
  static get observedAttributes() {
    return ['src']
  }
  attributeChangedCallback() {
    this.shadowRoot
      .querySelector('.container img')
      .setAttribute('src', this.getAttribute('src') || '')
  }
}
customElements.define('mat-image', Image)
