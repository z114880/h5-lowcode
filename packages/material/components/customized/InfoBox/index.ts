import { getActivityInfo } from '../../../utils/apis'
import { createElementFromHTML } from '../../../utils/tools'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-infobox': any
    }
  }
}

class InfoBox extends HTMLElement {
  InfoBoxTemplate: string
  constructor() {
    super()
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
    const componentNode = createElementFromHTML(this.InfoBoxTemplate) as HTMLTemplateElement

    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
  }
  static get observedAttributes() {
    return ['activity-id']
  }
  async attributeChangedCallback() {
    const activityId = this.getAttribute('activity-id')
    let data: any
    if (activityId) {
      data = await getActivityInfo(activityId)
      ;(this.shadowRoot!.querySelector('.container') as HTMLElement).innerHTML = data.activityRules
    }
  }
}

customElements.define('mat-infobox', InfoBox)
