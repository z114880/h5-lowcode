import { isInEditor, createElementFromHTML } from '../../../utils/tools'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-dialog': any
    }
  }
}

class Dialog extends HTMLElement {
  DialogTemplate: string
  constructor() {
    super()
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
    const componentNode = createElementFromHTML(this.DialogTemplate) as HTMLTemplateElement
    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
    //不在编辑状态下
    if (!isInEditor()) {
      ;(this.shadowRoot!.querySelector('.model') as HTMLElement).onclick = () => {
        this.setAttribute('show', 'false')
      }
      ;(this.shadowRoot!.querySelector('.content') as HTMLElement).onclick = (e: MouseEvent) => {
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
