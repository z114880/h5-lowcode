/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  isInEditor,
  checkLogin,
  login,
  useToast,
  createElementFromHTML,
  openLoading,
  closeLoading
} from '../../../utils/tools'
import { drawLottery, getTimes, updateTimes } from '../../../utils/apis'
declare const window: any
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-drawbutton': any
    }
  }
}

class DrawButton extends HTMLElement {
  DrawButtonTemplate: string
  constructor() {
    super()
    this.DrawButtonTemplate = `
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
    const componentNode = createElementFromHTML(this.DrawButtonTemplate) as HTMLTemplateElement

    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)
    //防止重复抽奖
    window.canDrawLottery = true
    ;(this.shadowRoot!.querySelector('.container') as HTMLElement).onclick = async () => {
      if (!window.canDrawLottery) return
      const activityId = this.getAttribute('activity-id')
      const realGoodsDialog = this.getAttribute('中奖后的实物弹窗名称')
      const virtualGoodsDialog = this.getAttribute('中奖后的虚拟弹窗名称')
      let res: any
      if (activityId) {
        if (!isInEditor()) {
          window.canDrawLottery = false
          openLoading()
          res = await drawLottery(activityId)
          closeLoading()
          try {
            updateTimes('timeLeft', activityId)
          } catch (e) {
            console.log(e)
          }
          if (res.code !== 0) {
            useToast(res.msg)
            window.canDrawLottery = true
            return
          }
          window.canDrawLottery = true
          window.LotteryResult = res.data
          if (res.data.type == 5) {
            useToast('谢谢惠顾')
          }
          if (realGoodsDialog) {
            if (res.data.type == 4) {
              const dialog = document.getElementsByName(realGoodsDialog)[0]
              const baseLayout = dialog.querySelector('mat-baselayout')!
              const cxText = baseLayout.querySelector('mat-text')!
              cxText.innerHTML = res.data.showName
              dialog.setAttribute('show', 'true')
            }
          }
          if (virtualGoodsDialog) {
            if (
              res.data.type == 1 ||
              res.data.type == 2 ||
              res.data.type == 3 ||
              res.data.type == 6
            ) {
              const dialog = document.getElementsByName(virtualGoodsDialog)[0]
              const baseLayout = dialog.querySelector('mat-baselayout')!
              const cxText = baseLayout.querySelector('mat-text')!
              cxText.innerHTML = res.data.showName
              dialog.setAttribute('show', 'true')
            }
          }
        }
      }
    }
  }
}

customElements.define('mat-drawbutton', DrawButton)
