import { createElementFromHTML } from '../../../utils/tools'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-text': any
    }
  }
}

class Text extends HTMLElement {
  TextTemplate: string
  constructor() {
    super()
    this.TextTemplate = `
    <template>
      <style>
        .container {
          width: 100%;
          height: 100%;
          text-decoration: inherit;
        }
      </style>
    
      <div class="container">
        <slot></slot>
      </div>
    </template>`
    const componentNode = createElementFromHTML(this.TextTemplate) as HTMLTemplateElement
    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
  }
}

customElements.define('mat-text', Text)
