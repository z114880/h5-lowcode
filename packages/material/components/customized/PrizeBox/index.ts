import { isInEditor, createElementFromHTML } from '../../../utils/tools'
import { getPrizeList } from '../../../utils/apis'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mat-prizebox': any
    }
  }
}

const prizeObj = [
  {
    showName: '7天',
    activityCode: 'VxGbmCFO',
    id: 101967,
    activitesId: 102,
    userId: '10291957',
    optionId: 425,
    optionName: '7天权限',
    isSend: 0,
    createDate: '2023-01-11 16:07:36',
    modifyDate: '2023-01-11 16:07:36',
    remark: '',
    type: 1,
    activitesName: '测试活动'
  },
  {
    showName: '小罐茶',
    activityCode: 'VxGbmCFO',
    id: 101968,
    activitesId: 102,
    userId: '10291957',
    optionId: 426,
    optionName: '小罐茶',
    isSend: 0,
    createDate: '2023-01-11 16:09:13',
    modifyDate: '2023-01-11 16:09:13',
    remark: '',
    type: 4,
    activitesName: '测试活动'
  },
  {
    showName: '7天',
    activityCode: 'VxGbmCFO',
    id: 101969,
    activitesId: 102,
    userId: '10291957',
    optionId: 425,
    optionName: '7天权限',
    isSend: 0,
    createDate: '2023-01-11 16:09:36',
    modifyDate: '2023-01-11 16:09:36',
    remark: '',
    type: 1,
    activitesName: '测试活动'
  },
  {
    showName: '小罐茶',
    activityCode: 'VxGbmCFO',
    id: 101970,
    activitesId: 102,
    userId: '10291957',
    optionId: 426,
    optionName: '小罐茶',
    isSend: 0,
    createDate: '2023-01-11 16:09:37',
    modifyDate: '2023-01-11 16:09:37',
    remark: '',
    type: 4,
    activitesName: '测试活动'
  },
  {
    showName: '小罐茶',
    activityCode: 'VxGbmCFO',
    id: 101973,
    activitesId: 102,
    userId: '10291957',
    optionId: 426,
    optionName: '小罐茶',
    isSend: 0,
    createDate: '2023-01-11 16:13:40',
    modifyDate: '2023-01-11 16:13:40',
    remark: '',
    type: 4,
    activitesName: '测试活动'
  },
  {
    showName: '小罐茶',
    activityCode: 'VxGbmCFO',
    id: 101974,
    activitesId: 102,
    userId: '10291957',
    optionId: 426,
    optionName: '小罐茶',
    isSend: 0,
    createDate: '2023-01-11 16:14:40',
    modifyDate: '2023-01-11 16:14:40',
    remark: '',
    type: 4,
    activitesName: '测试活动'
  },
  {
    showName: '小罐茶',
    activityCode: 'VxGbmCFO',
    id: 101975,
    activitesId: 102,
    userId: '10291957',
    optionId: 426,
    optionName: '小罐茶',
    isSend: 0,
    createDate: '2023-01-11 16:15:46',
    modifyDate: '2023-01-11 16:15:46',
    remark: '',
    type: 4,
    activitesName: '测试活动'
  },
  {
    showName: '7天',
    activityCode: 'VxGbmCFO',
    id: 101976,
    activitesId: 102,
    userId: '10291957',
    optionId: 425,
    optionName: '7天权限',
    isSend: 0,
    createDate: '2023-01-11 16:18:32',
    modifyDate: '2023-01-11 16:18:32',
    remark: '',
    type: 1,
    activitesName: '测试活动'
  }
]

class PrizeBox extends HTMLElement {
  PrizeBoxTemplate: string
  constructor() {
    super()
    this.PrizeBoxTemplate = `
    <template>
      <style>
        .container {
          display:block;
          width: 100%;
          height: 100%;
          position: relative;
          overflow-y: scroll;
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
    const componentNode = createElementFromHTML(this.PrizeBoxTemplate) as HTMLTemplateElement

    this.attachShadow({ mode: 'open' }).appendChild(componentNode!.content)

    if (isInEditor()) {
      this.updateCallback()
    } else {
      //监听dom属性变化
      const targetNode = this.parentElement!.parentElement
      //options：监听的属性
      const options = {
        attributes: true
        // attributeOldValue: true,
      }
      //回调事件
      const callback = () => {
        if (targetNode!.getAttribute('show') === 'true') {
          this.updateCallback()
        }
      }
      const mutationObserver = new MutationObserver(callback)
      mutationObserver.observe(targetNode!, options)
    }
  }
  async updateCallback() {
    const activityId = this.getAttribute('activity-id')
    let data
    if (isInEditor()) {
      //@mock数据
      data = prizeObj
    } else if (activityId) {
      data = (await getPrizeList(activityId)).data
    }
    this.updateList(data)
  }
  static get observedAttributes() {
    return []
  }
  private updateList(data: any) {
    ;(this.shadowRoot!.querySelector('.container') as HTMLElement).innerHTML = ''
    if (data)
      data.forEach((val: any, ind: number) => {
        const ele = document.createElement('div')
        ele.innerHTML = ind + 1 + '、' + val.showName
        ;(this.shadowRoot!.querySelector('.container') as HTMLElement).appendChild(ele)
      })
    if (data.length === 0) {
      ;(this.shadowRoot!.querySelector('.container') as HTMLElement).innerHTML =
        '还没有奖品，快去参与吧'
    }
  }
  async attributeChangedCallback() {}
}

customElements.define('mat-prizebox', PrizeBox)
