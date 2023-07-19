import { createElementFromHTML, useToast } from '../util/tools.js'
import { getTimes } from '../util/apis.js'

class TimeLeftText extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'TimeLeftTextTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
    this.TimeLeftTextTemplate = `
    <template>
      <style>
        .container {
          width: 100%;
          height: 100%;
          text-decoration: inherit;
        }
      </style>
    
      <div class="container">
        剩余抽奖次数：0
      </div>
    </template>`
    const componentNode = createElementFromHTML(this.TimeLeftTextTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
    this.updateTimes()
  }
  async updateTimes() {
    const activityId = this.getAttribute('activity-id')
    if (activityId) {
      const timeData = await getTimes()
      const times = timeData
      this.shadowRoot.querySelector('.container').innerHTML = `剩余抽奖次数：${times}`
    } else {
      useToast('剩余抽奖次数无活动ID')
    }
  }
}
customElements.define('mat-timelefttext', TimeLeftText)
