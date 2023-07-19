import { createElementFromHTML } from '../../../utils/tools'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-image': any
    }
  }
}

class Image extends HTMLElement {
  ImageTemplate: string
  constructor() {
    super()
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
    const componentNode = createElementFromHTML(this.ImageTemplate) as HTMLTemplateElement

    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
  }
  static get observedAttributes() {
    return ['src']
  }
  attributeChangedCallback() {
    ;(this.shadowRoot!.querySelector('.container img') as HTMLInputElement).setAttribute(
      'src',
      this.getAttribute('src') || ''
    )
  }
}

customElements.define('mat-image', Image)
