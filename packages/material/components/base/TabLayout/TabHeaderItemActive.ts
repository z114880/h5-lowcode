import { createElementFromHTML } from '../../../utils/tools'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-tabheaderitemactive': any
    }
  }
}

class TabHeaderItemActive extends HTMLElement {
  TabHeaderItemActiveTemplate: string
  constructor() {
    super()
    this.TabHeaderItemActiveTemplate = `
    <template>
      <style>
        .container {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          text-decoration: inherit;
          
        }
      </style>
      <div class="container">
        <slot name="content"/>
      </div>
    </template>`

    //采用shadow-dom
    const componentNode = createElementFromHTML(
      this.TabHeaderItemActiveTemplate
    ) as HTMLTemplateElement

    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
  }
}

customElements.define('mat-tabheaderitemactive', TabHeaderItemActive)
