import { createElementFromHTML } from '../../../utils/tools'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-tabheader': any
    }
  }
}

class TabHeader extends HTMLElement {
  TabHeaderTemplate: string
  constructor() {
    super()
    this.TabHeaderTemplate = `
    <template>
      <style>
        .container {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          text-decoration: inherit;
          
        }
        .container-inner {
          width: 100%;
          height: 100%;
          display: flex;
          overflow-x: scroll;
        }
        .header-wrap {
          display: flex;
          width: max-content;
        }
      </style>
      <div class="container">
        <div class="container-inner">
          <div class="header-wrap">
            <slot name="content"/>
          </div>
        </div>
        <slot name="header-resizer"/>
      </div>
    </template>`

    //采用shadow-dom
    const componentNode = createElementFromHTML(this.TabHeaderTemplate) as HTMLTemplateElement

    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
  }
}

customElements.define('mat-tabheader', TabHeader)
