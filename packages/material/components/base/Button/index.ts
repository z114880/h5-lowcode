import { createElementFromHTML } from '../../../utils/tools'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-button': any
    }
  }
}

class Button extends HTMLElement {
  ButtonTemplate: string
  constructor() {
    super()
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
    const componentNode = createElementFromHTML(this.ButtonTemplate) as HTMLTemplateElement

    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
  }
  static get observedAttributes() {
    return ['data-style']
  }
  attributeChangedCallback() {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(this.shadowRoot!.querySelector('.container') as HTMLElement).setAttribute(
      'style',
      this.getAttribute('data-style') || ''
    )
  }
}

customElements.define('mat-button', Button)
