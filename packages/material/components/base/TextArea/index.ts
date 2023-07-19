import { createElementFromHTML } from '../../../utils/tools'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-textarea': any
    }
  }
}

class TextArea extends HTMLElement {
  TextAreaTemplate: string
  constructor() {
    super()
    this.TextAreaTemplate = `
    <template>
      <style>
        .container {
          display:block;
          width: 100%;
          height: 100%;
          position: relative;
          text-decoration: inherit;
        }
        .container textarea {
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
          resize:none;
        }
      </style>

      <div class="container">
        <textarea></textarea>
      </div>
    </template>`
    const componentNode = createElementFromHTML(this.TextAreaTemplate) as HTMLTemplateElement
    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
  }
  static get observedAttributes() {
    return ['placeholder']
  }
  attributeChangedCallback() {
    const textArea = this.shadowRoot!.querySelector('.container textarea') as HTMLTextAreaElement
    textArea.setAttribute('placeholder', this.getAttribute('placeholder') || '')
    textArea.oninput = (e: Event) => {
      this.setAttribute('value', (e.target as HTMLTextAreaElement).value)
      this.dispatchEvent(
        new CustomEvent('textarea-change', {
          bubbles: false,
          detail: (e.target as HTMLTextAreaElement).value
        })
      )
      // usage
      // document.querySelector('mat-textarea').addEventListener('textarea-change', e => {
      //   console.log(e.detail)
      // })
    }
  }
}

customElements.define('mat-textarea', TextArea)
