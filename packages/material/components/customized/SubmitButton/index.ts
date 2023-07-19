import { commitUserInfo } from '../../../utils/apis'
import { useToast, createElementFromHTML } from '../../../utils/tools'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-submitbutton': any
    }
  }
}
declare const window: any

class SubmitButton extends HTMLElement {
  SubmitButtonTemplate: string
  constructor() {
    super()
    this.SubmitButtonTemplate = `
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
    
      <div class="container">
        <slot></slot>
      </div>
    </template>`

    //采用shadow-dom
    const componentNode = createElementFromHTML(this.SubmitButtonTemplate) as HTMLTemplateElement

    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
    ;(this.shadowRoot!.querySelector('.container') as HTMLElement).onclick = async () => {
      const parentElement = this.parentElement!
      const cxInputName = parentElement.querySelector("mat-input[name='name']")
      const cxInputAddress = parentElement.querySelector("mat-input[name='address']")
      const cxInputTelephone = parentElement.querySelector("mat-input[name='telephone']")
      const nameValue = cxInputName!.shadowRoot!.querySelector('input')!.value
      const addressValue = cxInputAddress!.shadowRoot!.querySelector('input')!.value
      const telephoneValue = cxInputTelephone!.shadowRoot!.querySelector('input')!.value
      if (window.LotteryResult && nameValue && addressValue && telephoneValue) {
        const data = await commitUserInfo({
          activityId: window.LotteryResult.activitesId,
          id: window.LotteryResult.id,
          name: nameValue,
          address: addressValue,
          telephone: telephoneValue
        })
        if (data.code == 0) {
          useToast('提交成功，奖品将于10个工作日内寄出。')
          this.parentElement!.parentElement!.setAttribute('show', 'false')
        }
      } else {
        useToast('信息不能为空')
      }
    }
  }
  static get observedAttributes() {
    return []
  }
  attributeChangedCallback() {}
}

customElements.define('mat-submitbutton', SubmitButton)
