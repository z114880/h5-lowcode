import { createElementFromHTML, isInEditor } from '../../../utils/tools'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-tabheaderitem': any
    }
  }
}

class TabHeaderItem extends HTMLElement {
  TabHeaderItemTemplate: string
  constructor() {
    super()
    this.TabHeaderItemTemplate = `
    <template>
      <style>
        .container {
          display:block;
          width: 100%;
          position: relative;
          text-decoration: inherit;
          height: 100%;
        }
        .content {
          display:block;
          width: 100%;
          position: relative;
          height: 100%;
          overflow: hidden;
        }
      </style>
    
      <div class="container">
        <div class="content">
          <slot name="content"/>
        </div>
        <slot name="headerItem"/>
      </div>
    </template>`

    //采用shadow-dom
    const componentNode = createElementFromHTML(this.TabHeaderItemTemplate) as HTMLTemplateElement

    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
    ;(this.shadowRoot!.querySelector('.container') as HTMLElement).onclick = async () => {
      if (isInEditor()) return
      const tabIndex = this.getAttribute('tab-index')
      if (tabIndex) {
        this.parentElement &&
          this.parentElement.parentElement &&
          this.parentElement.parentElement.setAttribute('active', tabIndex)
      }
    }
  }
  static get observedAttributes() {
    return ['tab-index', 'is-last', 'active', 'activedbackgroundcolor', 'deactivedbackgroundcolor']
  }
  attributeChangedCallback() {
    const isLast = this.getAttribute('is-last')
    if (isLast === 'true') {
      ;(this.shadowRoot!.querySelector('.container') as HTMLElement).style.overflow = 'hidden'
    } else {
      ;(this.shadowRoot!.querySelector('.container') as HTMLElement).style.overflow = 'unset'
    }
    const tabIndex = this.getAttribute('tab-index')
    const active = this.getAttribute('active')
    const activedBackgroundColor = this.getAttribute('activedbackgroundcolor')
    const deactivedBackgroundColor = this.getAttribute('deactivedbackgroundcolor')
    if (tabIndex === active) {
      ;(this.shadowRoot!.querySelector('.container') as HTMLElement).style.backgroundColor =
        activedBackgroundColor || deactivedBackgroundColor || '#fff'
      const activeItem = this.querySelector('mat-tabheaderitemactive') as HTMLElement
      if (activeItem) activeItem.style.display = 'block'
      const deactiveItem = this.querySelector('mat-tabheaderitemdeactive') as HTMLElement
      if (deactiveItem) deactiveItem.style.display = 'none'
    } else {
      ;(this.shadowRoot!.querySelector('.container') as HTMLElement).style.backgroundColor =
        deactivedBackgroundColor || '#fff'
      const activeItem = this.querySelector('mat-tabheaderitemactive') as HTMLElement
      if (activeItem) activeItem.style.display = 'none'
      const deactiveItem = this.querySelector('mat-tabheaderitemdeactive') as HTMLElement
      if (deactiveItem) deactiveItem.style.display = 'block'
    }
  }
}

customElements.define('mat-tabheaderitem', TabHeaderItem)
