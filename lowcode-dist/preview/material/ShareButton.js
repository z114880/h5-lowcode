import { rewardTimes, updateTimes } from '../util/apis.js'
import { createElementFromHTML, isInGenerated } from '../util/tools.js'

class ShareButton extends HTMLElement {
  constructor() {
    super()
    Object.defineProperty(this, 'ShareButtonTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
    this.ShareButtonTemplate = `
    <template>
      <style>
        .container {
          display:block;
          width: 100%;
          height: 100%;
          position: relative;
          text-decoration: inherit;
        }
        .mask {
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          margin: 0 auto;
          width: 10rem;
          height: 100%;
          background: rgba(0, 0, 0, .7);
          z-index: 10;
        }
        
        .toappPop {
          position: fixed;
          left: 50%;
          top: 7rem;
          transform: translate(-50%);
          width: 7rem;
          height: 3rem;
        }
        
        .toappPop p {
          font-size: .6rem;
          color: #fff;
          text-align: center;
          padding-top: 0.3rem;
          z-index: 300;
        }
      </style>
    
      <div class="container">
        <slot></slot>
        <div class="mask" style="display: none;">
          <div class="toappPop">
            <p>前往 <a href="#"
                style="text-decoration: underline; color: rgb(255, 255, 255);">app</a></p>
            <p>分享好友一起参加活动</p>
          </div>
        </div>
      </div>
     </template>`
    //采用shadow-dom
    const componentNode = createElementFromHTML(this.ShareButtonTemplate)
    const activityId = this.getAttribute('activity-id')
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
    this.shadowRoot.querySelector('.container').onclick = async () => {
      if (isInGenerated()) {
        this.shadowRoot.querySelector('.mask').style.display = 'block'
        if (activityId) {
          rewardTimes().then(() => {
            try {
              updateTimes('timeLeft', activityId)
            } catch (error) {
              console.log(error)
            }
          })
        }
      }
    }
    this.shadowRoot.querySelector('.mask').onclick = () => {
      setTimeout(() => {
        this.shadowRoot.querySelector('.mask').style.display = 'none'
      }, 10)
    }
    window.__cxnewsapp_share_done = (status) => {
      if (status) {
        if (activityId) {
          rewardTimes().then(() => {
            try {
              updateTimes('timeLeft', activityId)
            } catch (error) {
              console.log(error)
            }
          })
        }
      }
    }
  }
  static get observedAttributes() {
    return []
  }
  attributeChangedCallback() {}
}
customElements.define('mat-sharebutton', ShareButton)
