import { getActivityInfo } from '../util/apis.js'
import { createElementFromHTML } from '../util/tools.js'

class InfoBox extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'InfoBoxTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
    this.InfoBoxTemplate = `
    <template>
      <style>
        .container {
          display:block;
          width: 100%;
          height: 100%;
          position: relative;
          overflow-y: scroll;
          word-break: break-all;
          text-decoration: inherit;
        }
        p {
          margin: 0;
          padding: 0;
        }
      </style>
    
      <div class="container"></div>
    </template>`
    //采用shadow-dom
    const componentNode = createElementFromHTML(this.InfoBoxTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
  }
  static get observedAttributes() {
    return ['activity-id']
  }
  async attributeChangedCallback() {
    const activityId = this.getAttribute('activity-id')
    let data
    if (activityId) {
      data = await getActivityInfo()
      this.shadowRoot.querySelector('.container').innerHTML = data.activityRules
    }
  }
}
customElements.define('mat-infobox', InfoBox)
