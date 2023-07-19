import { checkLogin, login, createElementFromHTML, isInEditor } from '../../../utils/tools'
import { rewardTimes, updateTimes } from '../../../utils/apis'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-loginbutton': any
    }
  }
}

class LoginButton extends HTMLElement {
  LoginButtonTemplate: string
  constructor() {
    super()
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
    const componentNode = createElementFromHTML(this.LoginButtonTemplate) as HTMLTemplateElement

    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
    if (checkLogin() && !isInEditor()) {
      const activityId = this.getAttribute('activity-id')
      if (activityId) {
        rewardTimes(activityId, 1).then(() => {
          try {
            updateTimes('timeLeft', activityId)
          } catch (error) {
            console.log(error)
          }
        })
      }
      const url = 'javascript:void(0)'
      ;(this.shadowRoot!.querySelector('.container') as HTMLElement).innerHTML =
        this.getAttribute('登录后显示文案')?.replace(
          'XXX',
          `<a href="${url}" style="text-decoration: underline;color:inherit;">NICK_NAME</a>`
        ) || ''
    } else {
      ;(this.shadowRoot!.querySelector('.container') as HTMLElement).onclick = async () => {
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
