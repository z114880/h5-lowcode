;(function () {
  const shareTitle = document.getElementById('wx_shareTitle')
  const shareMessage = document.getElementById('wx_shareMessage')
  const shareLogo = document.getElementById('wx_shareLogo')
  const shareLink = window.location.href
  if(window.wx){
    wx.ready(function () {
      wx.onMenuShareTimeline({
        title: shareTitle, // 分享标题
        link: shareLink, // 分享链接
        imgUrl: shareLogo, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
      wx.onMenuShareAppMessage({
        title: shareTitle, // 分享标题
        desc: shareMessage, // 分享描述
        link: shareLink, // 分享链接
        imgUrl: shareLogo, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
      wx.onMenuShareQQ({
        title: shareTitle, // 分享标题
        desc: shareMessage, // 分享描述
        link: shareLink, // 分享链接
        imgUrl: shareLogo, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
      wx.onMenuShareWeibo({
        title: shareTitle, // 分享标题
        desc: shareMessage, // 分享描述
        link: shareLink, // 分享链接
        imgUrl: shareLogo, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
    })
  }
})()

function defaultTrigger(className, animationClassName) {
  document.getElementsByClassName(className)[0].classList.add(animationClassName)
}

function clickTrigger(className, animationClassName) {
  const element = document.getElementsByClassName(className)[0]
  element.addEventListener('click', () => {
    element.classList.add(animationClassName)
  })
}

