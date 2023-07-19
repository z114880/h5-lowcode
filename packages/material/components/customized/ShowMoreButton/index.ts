import { createElementFromHTML } from '../../../utils/tools'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-showmorebutton': any
    }
  }
}

class ShowMoreButton extends HTMLElement {
  ShowMoreButtonTemplate: string
  constructor() {
    super()
    this.ShowMoreButtonTemplate = `
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
    const componentNode = createElementFromHTML(this.ShowMoreButtonTemplate) as HTMLTemplateElement

    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
    ;(this.shadowRoot!.querySelector('.container') as HTMLElement).onclick = async () => {
      const showMoreLayout = document.getElementsByName('showMoreLayout')[0]
      if (showMoreLayout) {
        showMoreLayout.setAttribute('hidden', 'false')
        ;(this.parentElement as HTMLElement).style.display = 'none'
      }
    }
  }
  static get observedAttributes() {
    return []
  }
  attributeChangedCallback() {}
}

customElements.define('mat-showmorebutton', ShowMoreButton)
