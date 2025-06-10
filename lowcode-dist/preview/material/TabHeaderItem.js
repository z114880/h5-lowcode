import { createElementFromHTML, isInEditor } from '../util/tools.js'

class TabHeaderItem extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'TabHeaderItemTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
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
    const componentNode = createElementFromHTML(this.TabHeaderItemTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
    this.shadowRoot.querySelector('.container').onclick = async () => {
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
      this.shadowRoot.querySelector('.container').style.overflow = 'hidden'
    } else {
      this.shadowRoot.querySelector('.container').style.overflow = 'unset'
    }
    const tabIndex = this.getAttribute('tab-index')
    const active = this.getAttribute('active')
    const activedBackgroundColor = this.getAttribute('activedbackgroundcolor')
    const deactivedBackgroundColor = this.getAttribute('deactivedbackgroundcolor')
    if (tabIndex === active) {
      this.shadowRoot.querySelector('.container').style.backgroundColor =
        activedBackgroundColor || deactivedBackgroundColor || '#fff'
      const activeItem = this.querySelector('mat-tabheaderitemactive')
      if (activeItem) activeItem.style.display = 'block'
      const deactiveItem = this.querySelector('mat-tabheaderitemdeactive')
      if (deactiveItem) deactiveItem.style.display = 'none'
    } else {
      this.shadowRoot.querySelector('.container').style.backgroundColor =
        deactivedBackgroundColor || '#fff'
      const activeItem = this.querySelector('mat-tabheaderitemactive')
      if (activeItem) activeItem.style.display = 'none'
      const deactiveItem = this.querySelector('mat-tabheaderitemdeactive')
      if (deactiveItem) deactiveItem.style.display = 'block'
    }
  }
}
customElements.define('mat-tabheaderitem', TabHeaderItem)
