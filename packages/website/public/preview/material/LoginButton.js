import { createElementFromHTML, isInEditor, login } from '../util/tools.js'
import { rewardTimes, updateTimes } from '../util/apis.js'

class LoginButton extends HTMLElement {
  constructor() {
    var _a
    super()
    Object.defineProperty(this, 'LoginButtonTemplate', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    })
    this.LoginButtonTemplate = `
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
    
      <div class="container"><span style="text-decoration:underline">登录<span/></div>
    </template>`
    //采用shadow-dom
    const componentNode = createElementFromHTML(this.LoginButtonTemplate)
    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)
    if (!isInEditor()) {
      const activityId = this.getAttribute('activity-id')
      if (activityId) {
        rewardTimes().then(() => {
          try {
            updateTimes('timeLeft', activityId)
          } catch (error) {
            console.log(error)
          }
        })
      }
      const url = 'javascript:void(0)'
      this.shadowRoot.querySelector('.container').innerHTML =
        ((_a = this.getAttribute('登录后显示文案')) === null || _a === void 0
          ? void 0
          : _a.replace(
              'XXX',
              `<a href="${url}" style="text-decoration: underline;color:inherit;">NICK_NAME</a>`
            )) || ''
    } else {
      this.shadowRoot.querySelector('.container').onclick = async () => {
        login()
      }
    }
  }
  static get observedAttributes() {
    return []
  }
  async attributeChangedCallback() {}
}
customElements.define('mat-loginbutton', LoginButton)
