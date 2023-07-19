import { createElementFromHTML, isInEditor } from '../../../utils/tools'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-tablayout': any
    }
  }
}

class TabLayout extends HTMLElement {
  TabLayoutTemplate: string
  constructor() {
    super()
    this.TabLayoutTemplate = `
    <template>
      <style>
        .container {
          display:block;
          width: 100%;
          position: relative;
          text-decoration: inherit;
        }
      </style>
    
      <div class="container">
        <slot name="content"/>
      </div>
    </template>`

    //采用shadow-dom
    const componentNode = createElementFromHTML(this.TabLayoutTemplate) as HTMLTemplateElement

    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
    setTimeout(() => {
      this.setAttribute('active', '0')
    }, 0)
  }
  static get observedAttributes() {
    return ['active', 'activedbackgroundcolor', 'deactivedbackgroundcolor']
  }
  attributeChangedCallback() {
    const items = this.querySelectorAll('mat-tabheader mat-tabheaderitem')
    const contents = this.querySelectorAll('mat-tabcontent mat-baselayout')

    const active = this.getAttribute('active')
    const activedBackgroundColor = this.getAttribute('activedbackgroundcolor')
    const deactivedBackgroundColor = this.getAttribute('deactivedbackgroundcolor')

    if (!isInEditor()) {
      for (let i = 0; i < items.length; i++) {
        items[i].setAttribute('tab-index', String(i))
        if (active) items[i].setAttribute('active', active)
        if (activedBackgroundColor)
          items[i].setAttribute('activedbackgroundcolor', activedBackgroundColor)
        if (deactivedBackgroundColor)
          items[i].setAttribute('deactivedbackgroundcolor', deactivedBackgroundColor)
      }
      for (let i = 0; i < contents.length; i++) {
        contents[i].setAttribute('hidden', 'true')
        if (Number(active) === i) {
          contents[i].setAttribute('hidden', 'false')
        }
      }
    }
  }
}

customElements.define('mat-tablayout', TabLayout)
