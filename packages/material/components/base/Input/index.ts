import { createElementFromHTML } from '../../../utils/tools'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-input': any
    }
  }
}

class Input extends HTMLElement {
  InputTemplate: string
  constructor() {
    super()
    this.InputTemplate = `
    <template>
      <style>
        .container {
          display:block;
          width: 100%;
          height: 100%;
          position: relative;
          text-decoration: inherit;
        }
        .container input {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border: 0;
          background: transparent;
          padding-left: 6px;
          outline-style: none;
          color: inherit;
          font-size: inherit;
          background-color: inherit;
        }
      </style>

      <div class="container">
        <input/>
      </div>
    </template>`
    const componentNode = createElementFromHTML(this.InputTemplate) as HTMLTemplateElement
    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
  }
  static get observedAttributes() {
    return ['placeholder']
  }
  attributeChangedCallback() {
    const input = this.shadowRoot!.querySelector('.container input') as HTMLInputElement
    input.setAttribute('placeholder', this.getAttribute('placeholder') || '')
    input.oninput = (e: Event) => {
      this.setAttribute('value', (e.target as HTMLInputElement).value)
      this.dispatchEvent(
        new CustomEvent('input-change', {
          bubbles: false,
          detail: (e.target as HTMLInputElement).value
        })
      )
      // usage
      // document.querySelector('mat-input').addEventListener('input-change', e => {
      //   console.log(e.detail)
      // })
    }
  }
}

customElements.define('mat-input', Input)
