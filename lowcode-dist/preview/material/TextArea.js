import { createElementFromHTML } from '../util/tools.js'

class TextArea extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'TextAreaTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
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
    const componentNode = createElementFromHTML(this.TextAreaTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
  }
  static get observedAttributes() {
    return ['placeholder']
  }
  attributeChangedCallback() {
    const textArea = this.shadowRoot.querySelector('.container textarea')
    textArea.setAttribute('placeholder', this.getAttribute('placeholder') || '')
    textArea.oninput = (e) => {
      this.setAttribute('value', e.target.value)
      this.dispatchEvent(
        new CustomEvent('textarea-change', {
          bubbles: false,
          detail: e.target.value
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
