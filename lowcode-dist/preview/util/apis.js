import { useToast } from './tools.js'

const prefix = 'https://www.funet.top'
//我的奖品
async function getPrizeList(activityId) {
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
async function getActivityInfo(activityId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        activityRules: '活动规则1111111'
      })
    }, 600)
  })
}
//点击抽奖
async function drawLottery(activityId) {
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
//提交实物奖品
async function commitUserInfo(data) {
  const { activityId, id, name, telephone, address } = data
  console.log(activityId, id, name, telephone, address)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ code: 0, msg: 'success', data: '' })
    }, 600)
  })
}
//获取抽奖次数
async function getTimes(activityId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(10)
    }, 600)
  })
}
async function updateTimes(name, activityId) {
  if (activityId) {
    const timeData = await getTimes()
    const times = timeData
    document
      .getElementsByName(name)[0]
      .shadowRoot.querySelector('.container').innerHTML = `剩余抽奖次数：${times}`
  } else {
    useToast('无活动ID')
  }
}
//赠送抽奖次数
async function rewardTimes(activitesId, type) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('success')
    }, 600)
  })
}

export {
  commitUserInfo,
  drawLottery,
  getActivityInfo,
  getPrizeList,
  getTimes,
  rewardTimes,
  updateTimes
}
