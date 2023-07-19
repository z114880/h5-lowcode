import { useToast } from './tools'
declare const axios: any

const prefix = 'https://www.funet.top'

//我的奖品
export async function getPrizeList(activityId: string) {
  return (
    await axios.get(`${prefix}/api/lottery/getPrizeList`, {
      params: {
        activitesId: activityId,
        userId: 'USER_UID'
      }
    })
  ).data
}
//活动信息
export async function getActivityInfo(activityId: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        activityRules: '活动规则1111111'
      })
    }, 600)
  })
}
//点击抽奖
export async function drawLottery(activityId: string) {
  return (
    await axios.get(`${prefix}/api/lottery/drawLottery`, {
      activitesId: activityId,
      userId: 'USER_UID',
      code: 'USER_LOGIN_CODE',
      unit: 'USER_UNIT',
      deviceType: 'USER_DEVICE_TYPE'
    })
  ).data
}
export type userInfoType = {
  activityId: string
  id: string
  name: string
  telephone: string
  address: string
}
//提交实物奖品
export async function commitUserInfo(data: userInfoType): Promise<Record<string, any>> {
  const { activityId, id, name, telephone, address } = data
  console.log(activityId, id, name, telephone, address)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ code: 0, msg: 'success', data: '' })
    }, 600)
  })
}

//获取抽奖次数
export async function getTimes(activityId: string): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(10)
    }, 600)
  })
}

export async function updateTimes(name: string, activityId: string) {
  if (activityId) {
    const timeData = await getTimes(activityId)
    const times = timeData
    document
      .getElementsByName(name)[0]!
      .shadowRoot!.querySelector('.container')!.innerHTML = `剩余抽奖次数：${times}`
  } else {
    useToast('无活动ID')
  }
}
//赠送抽奖次数
export async function rewardTimes(activitesId: string | number, type: number | string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('success')
    }, 600)
  })
}
