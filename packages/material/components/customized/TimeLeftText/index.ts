import { createElementFromHTML, useToast } from '../../../utils/tools'
import { getTimes } from '../../../utils/apis'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-timelefttext': any
    }
  }
}

class TimeLeftText extends HTMLElement {
  TimeLeftTextTemplate: string
  constructor() {
    super()
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
    const componentNode = createElementFromHTML(this.TimeLeftTextTemplate) as HTMLTemplateElement
    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
    this.updateTimes()
  }
  async updateTimes() {
    const activityId = this.getAttribute('activity-id')
    if (activityId) {
      const timeData = await getTimes(activityId)
      const times = timeData
      ;(
        this.shadowRoot!.querySelector('.container') as HTMLElement
      ).innerHTML = `剩余抽奖次数：${times}`
    } else {
      useToast('剩余抽奖次数无活动ID')
    }
  }
}

customElements.define('mat-timelefttext', TimeLeftText)
