import prettier from 'prettier';
import parserHtml from 'prettier/parser-html';
import parserCss from 'prettier/parser-postcss';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

var normalizeCss = "\nhtml {\n  font-family: \"微软雅黑\";\n}\n\nbody, dd, dl, dt, form, h1, h2, h3, h4, h5, img, input, li, ol, p, ul {\n  margin: 0;\n  padding: 0;\n  border: 0\n}\nimg {\n  display: block;\n  width: 100%;\n}\nbody {\n  background: #fff;\n  position: relative;\n}\n\na, dd, dl, dt, li, ul {\n  list-style-position: outside;\n  text-decoration: none\n}\n\nul {\n  list-style-type: none\n}\n\n#app{\n  width: 100%;\n  height: 100%;\n  max-width: 540px;\n  margin: 0 auto;\n  position: relative;\n  -webkit-tap-highlight-color:rgba(0,0,0,0);\n}\n\n.toast {\n  position: fixed;\n  top: calc(50% - .4rem);\n  font-size: .4rem;\n  line-height: .8rem;\n  opacity: 0;\n  transition: opacity 0.4s ease-out;\n  border-radius: .10666667rem;\n  background-color: black;\n  color: white;\n  padding-left: .4rem;\n  padding-right: .4rem;\n  z-index: 1000;\n}\n\n.toastEnd {\n  opacity: 0.8;\n}";

var indexCss = "mat-baselayout {\n  display: block;\n  position: relative;\n  background-size: 100% auto;\n  background-repeat: no-repeat;\n  box-sizing: border-box;\n  overflow-x: hidden;\n  overflow-y: scroll;\n}\nmat-blocklayout {\n  display: block;\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n  background-size: 100% auto;\n  background-repeat: no-repeat;\n  cursor: pointer;\n  box-sizing: border-box;\n}\n\nmat-tabheader,\nmat-tabcontent,\nmat-tabheaderitem,\nmat-tabheaderitemactive,\nmat-tabheaderitemdeactive {\n  position: absolute;\n  display: block;\n  position: relative;\n  overflow: unset;\n  user-select: none;\n}\nmat-tablayout {\n  overflow: hidden;\n  display: block;\n  position: relative;\n  user-select: none;\n}\nmat-tabheaderitem,\nmat-tabheaderitemactive,\nmat-tabheaderitemdeactive {\n  height: 100%;\n}\n\nmat-tabheaderitemactive,\nmat-tabheaderitemdeactive {\n  display: none;\n}\n\nmat-image,\nmat-button,\nmat-closebutton,\nmat-drawbutton,\nmat-submitbutton,\nmat-prizebutton,\nmat-infobutton,\nmat-loginbutton,\nmat-sharebutton,\nmat-exchangebutton,\nmat-showmorebutton,\nmat-copycouponbutton {\n  position: absolute;\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  background-size: 100% auto;\n  background-repeat: no-repeat;\n  cursor: pointer;\n}\nmat-text {\n  position: absolute;\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  line-height: normal;\n  white-space: normal;\n  word-wrap: break-word;\n  word-break: break-all;\n}\nmat-input,\nmat-textarea {\n  position: absolute;\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  line-height: normal;\n}\n\nmat-closebutton,\nmat-drawbutton,\nmat-submitbutton,\nmat-prizebutton,\nmat-infobutton,\nmat-loginbutton,\nmat-sharebutton,\nmat-exchangebutton,\nmat-showmorebutton,\nmat-copycouponbutton,\nmat-input,\nmat-textarea,\nmat-text {\n  position: absolute;\n}";

var animationCss = "@keyframes bounce {\n  from,\n  20%,\n  53%,\n  to {\n    transform-origin: center bottom;\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    transform: translate3d(0, 0, 0);\n  }\n\n  40%,\n  43% {\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    transform: translate3d(0, -30px, 0) scaleY(1.1);\n  }\n\n  70% {\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    transform: translate3d(0, -15px, 0) scaleY(1.05);\n  }\n\n  80% {\n    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    transform: translate3d(0, 0, 0) scaleY(0.95);\n  }\n\n  90% {\n    transform: translate3d(0, -4px, 0) scaleY(1.02);\n  }\n}\n\n@keyframes flash {\n  from,\n  50%,\n  to {\n    opacity: 1;\n  }\n\n  25%,\n  75% {\n    opacity: 0;\n  }\n}\n\n@keyframes headShake {\n  0% {\n    transform: translateX(0);\n  }\n\n  6.5% {\n    transform: translateX(-6px) rotateY(-9deg);\n  }\n\n  18.5% {\n    transform: translateX(5px) rotateY(7deg);\n  }\n\n  31.5% {\n    transform: translateX(-3px) rotateY(-5deg);\n  }\n\n  43.5% {\n    transform: translateX(2px) rotateY(3deg);\n  }\n\n  50% {\n    transform: translateX(0);\n  }\n}\n\n@keyframes heartBeat {\n  0% {\n    transform: scale(1);\n  }\n\n  14% {\n    transform: scale(1.3);\n  }\n\n  28% {\n    transform: scale(1);\n  }\n\n  42% {\n    transform: scale(1.3);\n  }\n\n  70% {\n    transform: scale(1);\n  }\n}\n\n@keyframes jello {\n  from,\n  11.1%,\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n\n  22.2% {\n    transform: skewX(-12.5deg) skewY(-12.5deg);\n  }\n\n  33.3% {\n    transform: skewX(6.25deg) skewY(6.25deg);\n  }\n\n  44.4% {\n    transform: skewX(-3.125deg) skewY(-3.125deg);\n  }\n\n  55.5% {\n    transform: skewX(1.5625deg) skewY(1.5625deg);\n  }\n\n  66.6% {\n    transform: skewX(-0.78125deg) skewY(-0.78125deg);\n  }\n\n  77.7% {\n    transform: skewX(0.390625deg) skewY(0.390625deg);\n  }\n\n  88.8% {\n    transform: skewX(-0.1953125deg) skewY(-0.1953125deg);\n  }\n}\n\n@keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    transform: scale3d(1.05, 1.05, 1.05);\n  }\n}\n\n@keyframes rubberBand {\n  from {\n    transform: scale3d(1, 1, 1);\n  }\n\n  30% {\n    transform: scale3d(1.25, 0.75, 1);\n  }\n\n  40% {\n    transform: scale3d(0.75, 1.25, 1);\n  }\n\n  50% {\n    transform: scale3d(1.15, 0.85, 1);\n  }\n\n  65% {\n    transform: scale3d(0.95, 1.05, 1);\n  }\n\n  75% {\n    transform: scale3d(1.05, 0.95, 1);\n  }\n\n  to {\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes shakeX {\n  from,\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translate3d(-10px, 0, 0);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translate3d(10px, 0, 0);\n  }\n}\n\n@keyframes shakeY {\n  from,\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translate3d(0, -10px, 0);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translate3d(0, 10px, 0);\n  }\n}\n\n@keyframes swing {\n  from {\n    transform-origin: top center;\n  }\n  20% {\n    transform: rotate3d(0, 0, 1, 15deg);\n  }\n\n  40% {\n    transform: rotate3d(0, 0, 1, -10deg);\n  }\n\n  60% {\n    transform: rotate3d(0, 0, 1, 5deg);\n  }\n\n  80% {\n    transform: rotate3d(0, 0, 1, -5deg);\n  }\n\n  to {\n    transform-origin: top center;\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n}\n\n@keyframes tada {\n  from {\n    transform: scale3d(1, 1, 1);\n  }\n\n  10%,\n  20% {\n    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n  }\n\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n  }\n\n  40%,\n  60%,\n  80% {\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n  }\n\n  to {\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes wobble {\n  from {\n    transform: translate3d(0, 0, 0);\n  }\n\n  15% {\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n  }\n\n  30% {\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n  }\n\n  45% {\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n  }\n\n  60% {\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n  }\n\n  75% {\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n  }\n\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n}\n\n@keyframes flip {\n  from {\n    backface-visibility: visible;\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg);\n    animation-timing-function: ease-out;\n  }\n\n  40% {\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -190deg);\n    animation-timing-function: ease-out;\n  }\n\n  50% {\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -170deg);\n    animation-timing-function: ease-in;\n  }\n\n  80% {\n    transform: perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)\n      rotate3d(0, 1, 0, 0deg);\n    animation-timing-function: ease-in;\n  }\n\n  to {\n    backface-visibility: visible;\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg);\n    animation-timing-function: ease-in;\n  }\n}\n\n";

var presetsJs = "/* eslint-disable no-undef */\n/* eslint-disable @typescript-eslint/no-unused-vars */\n/* eslint-disable no-unused-vars */\nwindow.isInGenerated = true\nwindow.isInProduction = window.location.hostname === 'www.funet.top'\n\nconst openDialog = (name) => {\n  document.getElementsByName(name)[0].setAttribute('show', true)\n}\n\nconst openLink = (link) => {\n  window.location.href = link\n}\n\nconst backTop = () => {\n  document.body.scrollIntoView({ behavior: 'smooth' })\n}\n\nfunction cxLoginSuccess() {\n  window.location.reload()\n}\nfunction cxLogoutSuccess() {\n  window.location.reload()\n}\n";

var bottomJs = ";(function () {\n  const shareTitle = document.getElementById('wx_shareTitle')\n  const shareMessage = document.getElementById('wx_shareMessage')\n  const shareLogo = document.getElementById('wx_shareLogo')\n  const shareLink = window.location.href\n  wx.ready(function () {\n    wx.onMenuShareTimeline({\n      title: shareTitle, // 分享标题\n      link: shareLink, // 分享链接\n      imgUrl: shareLogo, // 分享图标\n      success: function () {\n        // 用户确认分享后执行的回调函数\n      },\n      cancel: function () {\n        // 用户取消分享后执行的回调函数\n      }\n    })\n    wx.onMenuShareAppMessage({\n      title: shareTitle, // 分享标题\n      desc: shareMessage, // 分享描述\n      link: shareLink, // 分享链接\n      imgUrl: shareLogo, // 分享图标\n      type: '', // 分享类型,music、video或link，不填默认为link\n      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空\n      success: function () {\n        // 用户确认分享后执行的回调函数\n      },\n      cancel: function () {\n        // 用户取消分享后执行的回调函数\n      }\n    })\n    wx.onMenuShareQQ({\n      title: shareTitle, // 分享标题\n      desc: shareMessage, // 分享描述\n      link: shareLink, // 分享链接\n      imgUrl: shareLogo, // 分享图标\n      success: function () {\n        // 用户确认分享后执行的回调函数\n      },\n      cancel: function () {\n        // 用户取消分享后执行的回调函数\n      }\n    })\n    wx.onMenuShareWeibo({\n      title: shareTitle, // 分享标题\n      desc: shareMessage, // 分享描述\n      link: shareLink, // 分享链接\n      imgUrl: shareLogo, // 分享图标\n      success: function () {\n        // 用户确认分享后执行的回调函数\n      },\n      cancel: function () {\n        // 用户取消分享后执行的回调函数\n      }\n    })\n  })\n})()\n";

var apis = "import { useToast } from './tools.js'\n\nconst prefix = 'https://www.funet.top'\n//我的奖品\nasync function getPrizeList(activityId) {\n  return (\n    await axios.get(`${prefix}/api/lottery/getPrizeList`, {\n      params: {\n        activitesId: activityId,\n        userId: 'USER_UID'\n      }\n    })\n  ).data\n}\n//活动信息\nasync function getActivityInfo(activityId) {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve({\n        activityRules: '活动规则1111111'\n      })\n    }, 600)\n  })\n}\n//点击抽奖\nasync function drawLottery(activityId) {\n  return (\n    await axios.get(`${prefix}/api/lottery/drawLottery`, {\n      activitesId: activityId,\n      userId: 'USER_UID',\n      code: 'USER_LOGIN_CODE',\n      unit: 'USER_UNIT',\n      deviceType: 'USER_DEVICE_TYPE'\n    })\n  ).data\n}\n//提交实物奖品\nasync function commitUserInfo(data) {\n  const { activityId, id, name, telephone, address } = data\n  console.log(activityId, id, name, telephone, address)\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve({ code: 0, msg: 'success', data: '' })\n    }, 600)\n  })\n}\n//获取抽奖次数\nasync function getTimes(activityId) {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve(10)\n    }, 600)\n  })\n}\nasync function updateTimes(name, activityId) {\n  if (activityId) {\n    const timeData = await getTimes()\n    const times = timeData\n    document\n      .getElementsByName(name)[0]\n      .shadowRoot.querySelector('.container').innerHTML = `剩余抽奖次数：${times}`\n  } else {\n    useToast('无活动ID')\n  }\n}\n//赠送抽奖次数\nasync function rewardTimes(activitesId, type) {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve('success')\n    }, 600)\n  })\n}\n\nexport {\n  commitUserInfo,\n  drawLottery,\n  getActivityInfo,\n  getPrizeList,\n  getTimes,\n  rewardTimes,\n  updateTimes\n}\n";

var tools = "const isInEditor = () => {\n  return window.isInEditor\n}\nconst isInGenerated = () => {\n  return window.isInGenerated\n}\nfunction login() {\n  useToast('登录成功')\n}\nconst useToast = (text, time) => {\n  const toastElement = document.createElement('div')\n  toastElement.innerHTML = text\n  toastElement.className = 'toast'\n  toastElement.style.left = '50%'\n  document.body.appendChild(toastElement)\n  toastElement.style.transform = `translate(-${toastElement.clientWidth / 2}px`\n  toastElement.classList.add('toastEnd')\n  setTimeout(\n    () => {\n      toastElement.remove()\n    },\n    time ? time : 1500\n  )\n}\nfunction createElementFromHTML(htmlString) {\n  const div = document.createElement('div')\n  div.innerHTML = htmlString.trim()\n  return div.firstChild\n}\nfunction copyToClipBoard(text) {\n  if (document.execCommand) {\n    const el = document.createElement('textarea')\n    el.value = text\n    el.setAttribute('readonly', '')\n    el.style.position = 'absolute'\n    el.style.left = '-9999px'\n    document.body.appendChild(el)\n    el.select()\n    if (document.execCommand('copy')) {\n      useToast('复制成功！')\n    } else {\n      useToast('复制失败，请手动复制')\n    }\n    document.body.removeChild(el)\n  } else if (navigator.clipboard) {\n    navigator.clipboard\n      .writeText(text)\n      .then(() => {\n        useToast('复制成功！')\n      })\n      .catch(() => {\n        useToast('复制失败，请手动复制')\n      })\n  } else {\n    useToast('复制失败，请手动复制')\n  }\n}\nconst openLoading = () => {\n  const element = createElementFromHTML(`\n    <div class=\"loadingWrap\" id=\"PageLoading\">\n      <div class=\"loadEffect\">\n        <span></span>\n        <span></span>\n        <span></span>\n        <span></span>\n        <span></span>\n        <span></span>\n        <span></span>\n        <span></span>\n      </div>\n      <style>\n        .loadingWrap {\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          position: fixed;\n          width: 100%;\n          height: 100%;\n          background: rgba(0, 0, 0, 0.5);\n          top: 0;\n          z-index: 9999;\n        }\n        .loadEffect {\n          width: 100px;\n          height: 100px;\n          position: relative;\n          transform: scale(0.5);\n        }\n        .loadEffect span {\n          display: inline-block;\n          width: 16px;\n          height: 16px;\n          border-radius: 50%;\n          background: white;\n          position: absolute;\n          animation: load 1.04s ease infinite;\n        }\n        @keyframes load {\n          0% {\n            opacity: 1;\n          }\n          100% {\n            opacity: 0.2;\n          }\n        }\n        .loadEffect span:nth-child(1) {\n          left: 1px;\n          top: 50%;\n          margin-top: -8px;\n          animation-delay: 0.13s;\n        }\n\n        .loadEffect span:nth-child(2) {\n          left: 14px;\n          top: 14px;\n          animation-delay: 0.26s;\n        }\n\n        .loadEffect span:nth-child(3) {\n          left: 50%;\n          top: 4px;\n          margin-left: -8px;\n          animation-delay: 0.39s;\n        }\n\n        .loadEffect span:nth-child(4) {\n          top: 14px;\n          right: 14px;\n          animation-delay: 0.52s;\n        }\n\n        .loadEffect span:nth-child(5) {\n          right: 1px;\n          top: 50%;\n          margin-top: -8px;\n          animation-delay: 0.65s;\n        }\n\n        .loadEffect span:nth-child(6) {\n          right: 14px;\n          bottom: 14px;\n          animation-delay: 0.78s;\n        }\n\n        .loadEffect span:nth-child(7) {\n          bottom: 4px;\n          left: 50%;\n          margin-left: -8px;\n          animation-delay: 0.91s;\n        }\n\n        .loadEffect span:nth-child(8) {\n          bottom: 14px;\n          left: 14px;\n          animation-delay: 1.04s;\n        }\n      </style>\n    </div>\n    `)\n  document.body.appendChild(element)\n}\nconst closeLoading = () => {\n  const loading = document.getElementById('PageLoading')\n  if (loading) loading.remove()\n}\n\nexport {\n  closeLoading,\n  copyToClipBoard,\n  createElementFromHTML,\n  isInEditor,\n  isInGenerated,\n  login,\n  openLoading,\n  useToast\n}\n";

var BaseLayout = "import { createElementFromHTML, isInEditor } from '../util/tools.js'\n\nclass BaseLayout extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'BaseLayoutTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.BaseLayoutTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n          display: inherit;\n          flex-direction: inherit;\n          justify-content: inherit;\n          align-items: inherit;\n        }\n      </style>\n    \n      <div class=\"container\">\n        <slot name=\"content\"/>\n      </div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.BaseLayoutTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n  }\n  static get observedAttributes() {\n    return ['hidden']\n  }\n  attributeChangedCallback() {\n    if (!isInEditor()) {\n      this.style.display = this.getAttribute('hidden') === 'true' ? 'none' : 'block'\n    }\n  }\n}\ncustomElements.define('mat-baselayout', BaseLayout)\n";

var BlockLayout = "import { createElementFromHTML, isInEditor } from '../util/tools.js'\n\nclass BlockLayout extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'BlockLayoutTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    Object.defineProperty(this, 'flexCss', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.BlockLayoutTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n          display: inherit;\n          flex-direction: inherit;\n          justify-content: inherit;\n          align-items: inherit;\n        }\n      </style>\n    \n      <div class=\"container\">\n        <slot name=\"content\"/>\n      </div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.BlockLayoutTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n    this.flexCss = ['display', 'flex-direction', 'justify-content', 'aliItems']\n  }\n  static get observedAttributes() {\n    return ['hidden', 'style']\n  }\n  attributeChangedCallback() {\n    if (!isInEditor()) {\n      this.style.display = this.getAttribute('hidden') === 'true' ? 'none' : 'block'\n    }\n  }\n}\ncustomElements.define('mat-blocklayout', BlockLayout)\n";

var Button = "import { createElementFromHTML } from '../util/tools.js'\n\nclass Button extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'ButtonTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.ButtonTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n        }\n      </style>\n    \n      <div class=\"container\">\n        <slot></slot>\n      </div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.ButtonTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n  }\n  static get observedAttributes() {\n    return ['data-style']\n  }\n  attributeChangedCallback() {\n    this.shadowRoot\n      .querySelector('.container')\n      .setAttribute('style', this.getAttribute('data-style') || '')\n  }\n}\ncustomElements.define('mat-button', Button)\n";

var CloseButton = "import { createElementFromHTML } from '../util/tools.js'\n\nclass CloseButton extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'CloseButtonTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.CloseButtonTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n        }\n      </style>\n    \n      <div class=\"container\">\n        <slot></slot>\n      </div>\n     </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.CloseButtonTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n    this.shadowRoot.querySelector('.container').onclick = async () => {\n      const dialog = this.parentElement.parentElement\n      dialog && dialog.setAttribute('show', 'false')\n    }\n  }\n  static get observedAttributes() {\n    return []\n  }\n  attributeChangedCallback() {}\n}\ncustomElements.define('mat-closebutton', CloseButton)\n";

var CopyCouponButton = "import { createElementFromHTML, copyToClipBoard } from '../util/tools.js'\n\nclass CopyCouponButton extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'CopyCouponButtonTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.CopyCouponButtonTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n        }\n      </style>\n    \n      <div class=\"container\">\n        <slot></slot>\n      </div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.CopyCouponButtonTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n    this.shadowRoot.querySelector('.container').onclick = async () => {\n      const parentElement = this.parentElement\n      const cxCouponText = parentElement.querySelector(\"mat-text[name='coupon']\")\n      copyToClipBoard(cxCouponText.innerHTML)\n    }\n  }\n  static get observedAttributes() {\n    return []\n  }\n  attributeChangedCallback() {}\n}\ncustomElements.define('mat-copycouponbutton', CopyCouponButton)\n";

var Dialog = "import { createElementFromHTML, isInEditor } from '../util/tools.js'\n\nclass Dialog extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'DialogTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.DialogTemplate = `\n    <template>\n      <style>\n        .model {\n          width: 100%;\n          height: 100%;\n          background: rgba(0,0,0,0.7);\n          display: flex;\n          justify-content: center;\n          align-items: center;\n        }\n      </style>\n    \n      <div class=\"model\">\n        <div class=\"content\">\n          <slot name=\"content\">\n        </div>\n      </div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.DialogTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n    //不在编辑状态下\n    if (!isInEditor()) {\n      this.shadowRoot.querySelector('.model').onclick = () => {\n        this.setAttribute('show', 'false')\n      }\n      this.shadowRoot.querySelector('.content').onclick = (e) => {\n        e.stopPropagation()\n      }\n    }\n  }\n  static get observedAttributes() {\n    return ['show']\n  }\n  attributeChangedCallback() {\n    this.style.display = this.getAttribute('show') === 'true' ? 'block' : 'none'\n  }\n}\ncustomElements.define('mat-dialog', Dialog)\n";

var DrawButton = "import {\n  createElementFromHTML,\n  isInEditor,\n  openLoading,\n  closeLoading,\n  useToast\n} from '../util/tools.js'\nimport { drawLottery, updateTimes } from '../util/apis.js'\n\n/* eslint-disable no-unused-vars */\nclass DrawButton extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'DrawButtonTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.DrawButtonTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n        }\n      </style>\n    \n      <div class=\"container\">\n        <slot></slot>\n      </div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.DrawButtonTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n    //防止重复抽奖\n    window.canDrawLottery = true\n    this.shadowRoot.querySelector('.container').onclick = async () => {\n      if (!window.canDrawLottery) return\n      const activityId = this.getAttribute('activity-id')\n      const realGoodsDialog = this.getAttribute('中奖后的实物弹窗名称')\n      const virtualGoodsDialog = this.getAttribute('中奖后的虚拟弹窗名称')\n      let res\n      if (activityId) {\n        if (!isInEditor()) {\n          window.canDrawLottery = false\n          openLoading()\n          res = await drawLottery(activityId)\n          closeLoading()\n          try {\n            updateTimes('timeLeft', activityId)\n          } catch (e) {\n            console.log(e)\n          }\n          if (res.code !== 0) {\n            useToast(res.msg)\n            window.canDrawLottery = true\n            return\n          }\n          window.canDrawLottery = true\n          window.LotteryResult = res.data\n          if (res.data.type == 5) {\n            useToast('谢谢惠顾')\n          }\n          if (realGoodsDialog) {\n            if (res.data.type == 4) {\n              const dialog = document.getElementsByName(realGoodsDialog)[0]\n              const baseLayout = dialog.querySelector('mat-baselayout')\n              const cxText = baseLayout.querySelector('mat-text')\n              cxText.innerHTML = res.data.showName\n              dialog.setAttribute('show', 'true')\n            }\n          }\n          if (virtualGoodsDialog) {\n            if (\n              res.data.type == 1 ||\n              res.data.type == 2 ||\n              res.data.type == 3 ||\n              res.data.type == 6\n            ) {\n              const dialog = document.getElementsByName(virtualGoodsDialog)[0]\n              const baseLayout = dialog.querySelector('mat-baselayout')\n              const cxText = baseLayout.querySelector('mat-text')\n              cxText.innerHTML = res.data.showName\n              dialog.setAttribute('show', 'true')\n            }\n          }\n        }\n      }\n    }\n  }\n}\ncustomElements.define('mat-drawbutton', DrawButton)\n";

var ExchangeButton = "import { createElementFromHTML, useToast } from '../util/tools.js'\n\nclass ExchangeButton extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'ExchangeButtonTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.ExchangeButtonTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          cursor: pointer;\n          text-decoration: inherit;\n        }\n      </style>\n    \n      <div class=\"container\">\n        <slot></slot>\n      </div>\n     </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.ExchangeButtonTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n    this.shadowRoot.querySelector('.container').onclick = async () => {\n      const activityId = this.getAttribute('activity-id')\n      if (activityId) {\n        useToast('兑换成功')\n      } else {\n        useToast('积分兑换无活动ID')\n      }\n    }\n  }\n  static get observedAttributes() {\n    return []\n  }\n  attributeChangedCallback() {}\n}\ncustomElements.define('mat-exchangebutton', ExchangeButton)\n";

var Image = "import { createElementFromHTML } from '../util/tools.js'\n\nclass Image extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'ImageTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.ImageTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n        }\n        .container img {\n          width: 100%;\n          height: auto;\n          object-fit: cover;\n        }\n      </style>\n    \n      <div class=\"container\">\n        <img src=\"\"></img>\n      </div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.ImageTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n  }\n  static get observedAttributes() {\n    return ['src']\n  }\n  attributeChangedCallback() {\n    this.shadowRoot\n      .querySelector('.container img')\n      .setAttribute('src', this.getAttribute('src') || '')\n  }\n}\ncustomElements.define('mat-image', Image)\n";

var InfoBox = "import { getActivityInfo } from '../util/apis.js'\nimport { createElementFromHTML } from '../util/tools.js'\n\nclass InfoBox extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'InfoBoxTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.InfoBoxTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          overflow-y: scroll;\n          word-break: break-all;\n          text-decoration: inherit;\n        }\n        p {\n          margin: 0;\n          padding: 0;\n        }\n      </style>\n    \n      <div class=\"container\"></div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.InfoBoxTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n  }\n  static get observedAttributes() {\n    return ['activity-id']\n  }\n  async attributeChangedCallback() {\n    const activityId = this.getAttribute('activity-id')\n    let data\n    if (activityId) {\n      data = await getActivityInfo()\n      this.shadowRoot.querySelector('.container').innerHTML = data.activityRules\n    }\n  }\n}\ncustomElements.define('mat-infobox', InfoBox)\n";

var InfoButton = "import { createElementFromHTML } from '../util/tools.js'\n\nclass InfoButton extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'ButtonTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.ButtonTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n        }\n      </style>\n    \n      <div class=\"container\">\n        <slot></slot>\n      </div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.ButtonTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n  }\n  static get observedAttributes() {\n    return ['活动说明弹窗名称']\n  }\n  attributeChangedCallback() {\n    this.shadowRoot.querySelector('.container').onclick = async () => {\n      const infoDialog = this.getAttribute('活动说明弹窗名称')\n      const dialog = document.getElementsByName(infoDialog)[0]\n      dialog.setAttribute('show', 'true')\n    }\n  }\n}\ncustomElements.define('mat-infobutton', InfoButton)\n";

var Input = "import { createElementFromHTML } from '../util/tools.js'\n\nclass Input extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'InputTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.InputTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n        }\n        .container input {\n          width: 100%;\n          height: 100%;\n          box-sizing: border-box;\n          border: 0;\n          background: transparent;\n          padding-left: 6px;\n          outline-style: none;\n          color: inherit;\n          font-size: inherit;\n          background-color: inherit;\n        }\n      </style>\n\n      <div class=\"container\">\n        <input/>\n      </div>\n    </template>`\n    const componentNode = createElementFromHTML(this.InputTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n  }\n  static get observedAttributes() {\n    return ['placeholder']\n  }\n  attributeChangedCallback() {\n    const input = this.shadowRoot.querySelector('.container input')\n    input.setAttribute('placeholder', this.getAttribute('placeholder') || '')\n    input.oninput = (e) => {\n      this.setAttribute('value', e.target.value)\n      this.dispatchEvent(\n        new CustomEvent('input-change', {\n          bubbles: false,\n          detail: e.target.value\n        })\n      )\n      // usage\n      // document.querySelector('mat-input').addEventListener('input-change', e => {\n      //   console.log(e.detail)\n      // })\n    }\n  }\n}\ncustomElements.define('mat-input', Input)\n";

var LoginButton = "import { createElementFromHTML, isInEditor, login } from '../util/tools.js'\nimport { rewardTimes, updateTimes } from '../util/apis.js'\n\nclass LoginButton extends HTMLElement {\n  constructor() {\n    var _a\n    super()\n    Object.defineProperty(this, 'LoginButtonTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.LoginButtonTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n        }\n      </style>\n    \n      <div class=\"container\"><span style=\"text-decoration:underline\">登录<span/></div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.LoginButtonTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n    if (!isInEditor()) {\n      const activityId = this.getAttribute('activity-id')\n      if (activityId) {\n        rewardTimes().then(() => {\n          try {\n            updateTimes('timeLeft', activityId)\n          } catch (error) {\n            console.log(error)\n          }\n        })\n      }\n      const url = 'javascript:void(0)'\n      this.shadowRoot.querySelector('.container').innerHTML =\n        ((_a = this.getAttribute('登录后显示文案')) === null || _a === void 0\n          ? void 0\n          : _a.replace(\n              'XXX',\n              `<a href=\"${url}\" style=\"text-decoration: underline;color:inherit;\">NICK_NAME</a>`\n            )) || ''\n    } else {\n      this.shadowRoot.querySelector('.container').onclick = async () => {\n        login()\n      }\n    }\n  }\n  static get observedAttributes() {\n    return []\n  }\n  async attributeChangedCallback() {}\n}\ncustomElements.define('mat-loginbutton', LoginButton)\n";

var PrizeBox = "import { createElementFromHTML, isInEditor } from '../util/tools.js'\nimport { getPrizeList } from '../util/apis.js'\n\nconst prizeObj = [\n  {\n    showName: '7天',\n    activityCode: 'VxGbmCFO',\n    id: 101967,\n    activitesId: 102,\n    userId: '10291957',\n    optionId: 425,\n    optionName: '7天权限',\n    isSend: 0,\n    createDate: '2023-01-11 16:07:36',\n    modifyDate: '2023-01-11 16:07:36',\n    remark: '',\n    type: 1,\n    activitesName: '测试活动'\n  },\n  {\n    showName: '小罐茶',\n    activityCode: 'VxGbmCFO',\n    id: 101968,\n    activitesId: 102,\n    userId: '10291957',\n    optionId: 426,\n    optionName: '小罐茶',\n    isSend: 0,\n    createDate: '2023-01-11 16:09:13',\n    modifyDate: '2023-01-11 16:09:13',\n    remark: '',\n    type: 4,\n    activitesName: '测试活动'\n  },\n  {\n    showName: '7天',\n    activityCode: 'VxGbmCFO',\n    id: 101969,\n    activitesId: 102,\n    userId: '10291957',\n    optionId: 425,\n    optionName: '7天权限',\n    isSend: 0,\n    createDate: '2023-01-11 16:09:36',\n    modifyDate: '2023-01-11 16:09:36',\n    remark: '',\n    type: 1,\n    activitesName: '测试活动'\n  },\n  {\n    showName: '小罐茶',\n    activityCode: 'VxGbmCFO',\n    id: 101970,\n    activitesId: 102,\n    userId: '10291957',\n    optionId: 426,\n    optionName: '小罐茶',\n    isSend: 0,\n    createDate: '2023-01-11 16:09:37',\n    modifyDate: '2023-01-11 16:09:37',\n    remark: '',\n    type: 4,\n    activitesName: '测试活动'\n  },\n  {\n    showName: '小罐茶',\n    activityCode: 'VxGbmCFO',\n    id: 101973,\n    activitesId: 102,\n    userId: '10291957',\n    optionId: 426,\n    optionName: '小罐茶',\n    isSend: 0,\n    createDate: '2023-01-11 16:13:40',\n    modifyDate: '2023-01-11 16:13:40',\n    remark: '',\n    type: 4,\n    activitesName: '测试活动'\n  },\n  {\n    showName: '小罐茶',\n    activityCode: 'VxGbmCFO',\n    id: 101974,\n    activitesId: 102,\n    userId: '10291957',\n    optionId: 426,\n    optionName: '小罐茶',\n    isSend: 0,\n    createDate: '2023-01-11 16:14:40',\n    modifyDate: '2023-01-11 16:14:40',\n    remark: '',\n    type: 4,\n    activitesName: '测试活动'\n  },\n  {\n    showName: '小罐茶',\n    activityCode: 'VxGbmCFO',\n    id: 101975,\n    activitesId: 102,\n    userId: '10291957',\n    optionId: 426,\n    optionName: '小罐茶',\n    isSend: 0,\n    createDate: '2023-01-11 16:15:46',\n    modifyDate: '2023-01-11 16:15:46',\n    remark: '',\n    type: 4,\n    activitesName: '测试活动'\n  },\n  {\n    showName: '7天',\n    activityCode: 'VxGbmCFO',\n    id: 101976,\n    activitesId: 102,\n    userId: '10291957',\n    optionId: 425,\n    optionName: '7天权限',\n    isSend: 0,\n    createDate: '2023-01-11 16:18:32',\n    modifyDate: '2023-01-11 16:18:32',\n    remark: '',\n    type: 1,\n    activitesName: '测试活动'\n  }\n]\nclass PrizeBox extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'PrizeBoxTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.PrizeBoxTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          overflow-y: scroll;\n          text-decoration: inherit;\n        }\n        p {\n          margin: 0;\n          padding: 0;\n        }\n      </style>\n    \n      <div class=\"container\"></div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.PrizeBoxTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n    if (isInEditor()) {\n      this.updateCallback()\n    } else {\n      //监听dom属性变化\n      const targetNode = this.parentElement.parentElement\n      //options：监听的属性\n      const options = {\n        attributes: true\n        // attributeOldValue: true,\n      }\n      //回调事件\n      const callback = () => {\n        if (targetNode.getAttribute('show') === 'true') {\n          this.updateCallback()\n        }\n      }\n      const mutationObserver = new MutationObserver(callback)\n      mutationObserver.observe(targetNode, options)\n    }\n  }\n  async updateCallback() {\n    const activityId = this.getAttribute('activity-id')\n    let data\n    if (isInEditor()) {\n      //@mock数据\n      data = prizeObj\n    } else if (activityId) {\n      data = (await getPrizeList(activityId)).data\n    }\n    this.updateList(data)\n  }\n  static get observedAttributes() {\n    return []\n  }\n  updateList(data) {\n    this.shadowRoot.querySelector('.container').innerHTML = ''\n    if (data)\n      data.forEach((val, ind) => {\n        const ele = document.createElement('div')\n        ele.innerHTML = ind + 1 + '、' + val.showName\n        this.shadowRoot.querySelector('.container').appendChild(ele)\n      })\n    if (data.length === 0) {\n      this.shadowRoot.querySelector('.container').innerHTML = '还没有奖品，快去参与吧'\n    }\n  }\n  async attributeChangedCallback() {}\n}\ncustomElements.define('mat-prizebox', PrizeBox)\n";

var PrizeButton = "import { createElementFromHTML } from '../util/tools.js'\n\nclass PrizeButton extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'PrizeButtonTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.PrizeButtonTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n        }\n      </style>\n    \n      <div class=\"container\">\n        <slot></slot>\n      </div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.PrizeButtonTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n    this.shadowRoot.querySelector('.container').onclick = async () => {\n      const myPrizeDialog = this.getAttribute('我的奖品弹窗名称')\n      const dialog = document.getElementsByName(myPrizeDialog)[0]\n      dialog.setAttribute('show', 'true')\n    }\n  }\n  static get observedAttributes() {\n    return []\n  }\n  attributeChangedCallback() {}\n}\ncustomElements.define('mat-prizebutton', PrizeButton)\n";

var ShareButton = "import { rewardTimes, updateTimes } from '../util/apis.js'\nimport { createElementFromHTML, isInGenerated } from '../util/tools.js'\n\nclass ShareButton extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'ShareButtonTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.ShareButtonTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n        }\n        .mask {\n          position: fixed;\n          left: 0;\n          right: 0;\n          top: 0;\n          margin: 0 auto;\n          width: 10rem;\n          height: 100%;\n          background: rgba(0, 0, 0, .7);\n          z-index: 10;\n        }\n        \n        .toappPop {\n          position: fixed;\n          left: 50%;\n          top: 7rem;\n          transform: translate(-50%);\n          width: 7rem;\n          height: 3rem;\n        }\n        \n        .toappPop p {\n          font-size: .6rem;\n          color: #fff;\n          text-align: center;\n          padding-top: 0.3rem;\n          z-index: 300;\n        }\n      </style>\n    \n      <div class=\"container\">\n        <slot></slot>\n        <div class=\"mask\" style=\"display: none;\">\n          <div class=\"toappPop\">\n            <p>前往 <a href=\"#\"\n                style=\"text-decoration: underline; color: rgb(255, 255, 255);\">app</a></p>\n            <p>分享好友一起参加活动</p>\n          </div>\n        </div>\n      </div>\n     </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.ShareButtonTemplate)\n    const activityId = this.getAttribute('activity-id')\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n    this.shadowRoot.querySelector('.container').onclick = async () => {\n      if (isInGenerated()) {\n        this.shadowRoot.querySelector('.mask').style.display = 'block'\n        if (activityId) {\n          rewardTimes().then(() => {\n            try {\n              updateTimes('timeLeft', activityId)\n            } catch (error) {\n              console.log(error)\n            }\n          })\n        }\n      }\n    }\n    this.shadowRoot.querySelector('.mask').onclick = () => {\n      setTimeout(() => {\n        this.shadowRoot.querySelector('.mask').style.display = 'none'\n      }, 10)\n    }\n    window.__cxnewsapp_share_done = (status) => {\n      if (status) {\n        if (activityId) {\n          rewardTimes().then(() => {\n            try {\n              updateTimes('timeLeft', activityId)\n            } catch (error) {\n              console.log(error)\n            }\n          })\n        }\n      }\n    }\n  }\n  static get observedAttributes() {\n    return []\n  }\n  attributeChangedCallback() {}\n}\ncustomElements.define('mat-sharebutton', ShareButton)\n";

var ShowMoreButton = "import { createElementFromHTML } from '../util/tools.js'\n\nclass ShowMoreButton extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'ShowMoreButtonTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.ShowMoreButtonTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n        }\n      </style>\n    \n      <div class=\"container\">\n        <slot></slot>\n      </div>\n     </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.ShowMoreButtonTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n    this.shadowRoot.querySelector('.container').onclick = async () => {\n      const showMoreLayout = document.getElementsByName('showMoreLayout')[0]\n      if (showMoreLayout) {\n        showMoreLayout.setAttribute('hidden', 'false')\n        this.parentElement.style.display = 'none'\n      }\n    }\n  }\n  static get observedAttributes() {\n    return []\n  }\n  attributeChangedCallback() {}\n}\ncustomElements.define('mat-showmorebutton', ShowMoreButton)\n";

var SubmitButton = "import { commitUserInfo } from '../util/apis.js'\nimport { createElementFromHTML, useToast } from '../util/tools.js'\n\nclass SubmitButton extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'SubmitButtonTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.SubmitButtonTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n        }\n      </style>\n    \n      <div class=\"container\">\n        <slot></slot>\n      </div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.SubmitButtonTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n    this.shadowRoot.querySelector('.container').onclick = async () => {\n      const parentElement = this.parentElement\n      const cxInputName = parentElement.querySelector(\"mat-input[name='name']\")\n      const cxInputAddress = parentElement.querySelector(\"mat-input[name='address']\")\n      const cxInputTelephone = parentElement.querySelector(\"mat-input[name='telephone']\")\n      const nameValue = cxInputName.shadowRoot.querySelector('input').value\n      const addressValue = cxInputAddress.shadowRoot.querySelector('input').value\n      const telephoneValue = cxInputTelephone.shadowRoot.querySelector('input').value\n      if (window.LotteryResult && nameValue && addressValue && telephoneValue) {\n        const data = await commitUserInfo({\n          activityId: window.LotteryResult.activitesId,\n          id: window.LotteryResult.id,\n          name: nameValue,\n          address: addressValue,\n          telephone: telephoneValue\n        })\n        if (data.code == 0) {\n          useToast('提交成功，奖品将于10个工作日内寄出。')\n          this.parentElement.parentElement.setAttribute('show', 'false')\n        }\n      } else {\n        useToast('信息不能为空')\n      }\n    }\n  }\n  static get observedAttributes() {\n    return []\n  }\n  attributeChangedCallback() {}\n}\ncustomElements.define('mat-submitbutton', SubmitButton)\n";

var TabContent = "import { createElementFromHTML } from '../util/tools.js'\n\nclass TabContent extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'TabContentTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.TabContentTemplate = `\n    <template>\n      <style>\n        .container {\n          display: block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n          \n        }\n      </style>\n      <div class=\"container\">\n        <slot name=\"content\"/>\n      </div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.TabContentTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n  }\n}\ncustomElements.define('mat-tabcontent', TabContent)\n";

var TabHeader = "import { createElementFromHTML } from '../util/tools.js'\n\nclass TabHeader extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'TabHeaderTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.TabHeaderTemplate = `\n    <template>\n      <style>\n        .container {\n          display: block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n          \n        }\n        .container-inner {\n          width: 100%;\n          height: 100%;\n          display: flex;\n          overflow-x: scroll;\n        }\n        .header-wrap {\n          display: flex;\n          width: max-content;\n        }\n      </style>\n      <div class=\"container\">\n        <div class=\"container-inner\">\n          <div class=\"header-wrap\">\n            <slot name=\"content\"/>\n          </div>\n        </div>\n        <slot name=\"header-resizer\"/>\n      </div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.TabHeaderTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n  }\n}\ncustomElements.define('mat-tabheader', TabHeader)\n";

var TabHeaderItem = "import { createElementFromHTML, isInEditor } from '../util/tools.js'\n\nclass TabHeaderItem extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'TabHeaderItemTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.TabHeaderItemTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          position: relative;\n          text-decoration: inherit;\n          height: 100%;\n        }\n        .content {\n          display:block;\n          width: 100%;\n          position: relative;\n          height: 100%;\n          overflow: hidden;\n        }\n      </style>\n    \n      <div class=\"container\">\n        <div class=\"content\">\n          <slot name=\"content\"/>\n        </div>\n        <slot name=\"headerItem\"/>\n      </div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.TabHeaderItemTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n    this.shadowRoot.querySelector('.container').onclick = async () => {\n      if (isInEditor()) return\n      const tabIndex = this.getAttribute('tab-index')\n      if (tabIndex) {\n        this.parentElement &&\n          this.parentElement.parentElement &&\n          this.parentElement.parentElement.setAttribute('active', tabIndex)\n      }\n    }\n  }\n  static get observedAttributes() {\n    return ['tab-index', 'is-last', 'active', 'activedbackgroundcolor', 'deactivedbackgroundcolor']\n  }\n  attributeChangedCallback() {\n    const isLast = this.getAttribute('is-last')\n    if (isLast === 'true') {\n      this.shadowRoot.querySelector('.container').style.overflow = 'hidden'\n    } else {\n      this.shadowRoot.querySelector('.container').style.overflow = 'unset'\n    }\n    const tabIndex = this.getAttribute('tab-index')\n    const active = this.getAttribute('active')\n    const activedBackgroundColor = this.getAttribute('activedbackgroundcolor')\n    const deactivedBackgroundColor = this.getAttribute('deactivedbackgroundcolor')\n    if (tabIndex === active) {\n      this.shadowRoot.querySelector('.container').style.backgroundColor =\n        activedBackgroundColor || deactivedBackgroundColor || '#fff'\n      const activeItem = this.querySelector('mat-tabheaderitemactive')\n      if (activeItem) activeItem.style.display = 'block'\n      const deactiveItem = this.querySelector('mat-tabheaderitemdeactive')\n      if (deactiveItem) deactiveItem.style.display = 'none'\n    } else {\n      this.shadowRoot.querySelector('.container').style.backgroundColor =\n        deactivedBackgroundColor || '#fff'\n      const activeItem = this.querySelector('mat-tabheaderitemactive')\n      if (activeItem) activeItem.style.display = 'none'\n      const deactiveItem = this.querySelector('mat-tabheaderitemdeactive')\n      if (deactiveItem) deactiveItem.style.display = 'block'\n    }\n  }\n}\ncustomElements.define('mat-tabheaderitem', TabHeaderItem)\n";

var TabHeaderItemActive = "import { createElementFromHTML } from '../util/tools.js'\n\nclass TabHeaderItemActive extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'TabHeaderItemActiveTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.TabHeaderItemActiveTemplate = `\n    <template>\n      <style>\n        .container {\n          display: block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n          \n        }\n      </style>\n      <div class=\"container\">\n        <slot name=\"content\"/>\n      </div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.TabHeaderItemActiveTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n  }\n}\ncustomElements.define('mat-tabheaderitemactive', TabHeaderItemActive)\n";

var TabHeaderItemDeActive = "import { createElementFromHTML } from '../util/tools.js'\n\nclass tabHeaderItemDeActive extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'tabHeaderItemDeActiveTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.tabHeaderItemDeActiveTemplate = `\n    <template>\n      <style>\n        .container {\n          display: block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n          \n        }\n      </style>\n      <div class=\"container\">\n        <slot name=\"content\"/>\n      </div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.tabHeaderItemDeActiveTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n  }\n}\ncustomElements.define('mat-tabheaderitemdeactive', tabHeaderItemDeActive)\n";

var TabLayout = "import { createElementFromHTML, isInEditor } from '../util/tools.js'\n\nclass TabLayout extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'TabLayoutTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.TabLayoutTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          position: relative;\n          text-decoration: inherit;\n        }\n      </style>\n    \n      <div class=\"container\">\n        <slot name=\"content\"/>\n      </div>\n    </template>`\n    //采用shadow-dom\n    const componentNode = createElementFromHTML(this.TabLayoutTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n    setTimeout(() => {\n      this.setAttribute('active', '0')\n    }, 0)\n  }\n  static get observedAttributes() {\n    return ['active', 'activedbackgroundcolor', 'deactivedbackgroundcolor']\n  }\n  attributeChangedCallback() {\n    const items = this.querySelectorAll('mat-tabheader mat-tabheaderitem')\n    const contents = this.querySelectorAll('mat-tabcontent mat-baselayout')\n    const active = this.getAttribute('active')\n    const activedBackgroundColor = this.getAttribute('activedbackgroundcolor')\n    const deactivedBackgroundColor = this.getAttribute('deactivedbackgroundcolor')\n    if (!isInEditor()) {\n      for (let i = 0; i < items.length; i++) {\n        items[i].setAttribute('tab-index', String(i))\n        if (active) items[i].setAttribute('active', active)\n        if (activedBackgroundColor)\n          items[i].setAttribute('activedbackgroundcolor', activedBackgroundColor)\n        if (deactivedBackgroundColor)\n          items[i].setAttribute('deactivedbackgroundcolor', deactivedBackgroundColor)\n      }\n      for (let i = 0; i < contents.length; i++) {\n        contents[i].setAttribute('hidden', 'true')\n        if (Number(active) === i) {\n          contents[i].setAttribute('hidden', 'false')\n        }\n      }\n    }\n  }\n}\ncustomElements.define('mat-tablayout', TabLayout)\n";

var Text = "import { createElementFromHTML } from '../util/tools.js'\n\nclass Text extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'TextTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.TextTemplate = `\n    <template>\n      <style>\n        .container {\n          width: 100%;\n          height: 100%;\n          text-decoration: inherit;\n        }\n      </style>\n    \n      <div class=\"container\">\n        <slot></slot>\n      </div>\n    </template>`\n    const componentNode = createElementFromHTML(this.TextTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n  }\n}\ncustomElements.define('mat-text', Text)\n";

var TextArea = "import { createElementFromHTML } from '../util/tools.js'\n\nclass TextArea extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'TextAreaTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.TextAreaTemplate = `\n    <template>\n      <style>\n        .container {\n          display:block;\n          width: 100%;\n          height: 100%;\n          position: relative;\n          text-decoration: inherit;\n        }\n        .container textarea {\n          width: 100%;\n          height: 100%;\n          box-sizing: border-box;\n          border: 0;\n          background: transparent;\n          padding-left: 6px;\n          outline-style: none;\n          color: inherit;\n          font-size: inherit;\n          background-color: inherit;\n          resize:none;\n        }\n      </style>\n\n      <div class=\"container\">\n        <textarea></textarea>\n      </div>\n    </template>`\n    const componentNode = createElementFromHTML(this.TextAreaTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n  }\n  static get observedAttributes() {\n    return ['placeholder']\n  }\n  attributeChangedCallback() {\n    const textArea = this.shadowRoot.querySelector('.container textarea')\n    textArea.setAttribute('placeholder', this.getAttribute('placeholder') || '')\n    textArea.oninput = (e) => {\n      this.setAttribute('value', e.target.value)\n      this.dispatchEvent(\n        new CustomEvent('textarea-change', {\n          bubbles: false,\n          detail: e.target.value\n        })\n      )\n      // usage\n      // document.querySelector('mat-textarea').addEventListener('textarea-change', e => {\n      //   console.log(e.detail)\n      // })\n    }\n  }\n}\ncustomElements.define('mat-textarea', TextArea)\n";

var TimeLeftText = "import { createElementFromHTML, useToast } from '../util/tools.js'\nimport { getTimes } from '../util/apis.js'\n\nclass TimeLeftText extends HTMLElement {\n  constructor() {\n    super()\n    Object.defineProperty(this, 'TimeLeftTextTemplate', {\n      enumerable: true,\n      configurable: true,\n      writable: true,\n      value: void 0\n    })\n    this.TimeLeftTextTemplate = `\n    <template>\n      <style>\n        .container {\n          width: 100%;\n          height: 100%;\n          text-decoration: inherit;\n        }\n      </style>\n    \n      <div class=\"container\">\n        剩余抽奖次数：0\n      </div>\n    </template>`\n    const componentNode = createElementFromHTML(this.TimeLeftTextTemplate)\n    this.attachShadow({ mode: 'open' }).appendChild(componentNode.content)\n    this.updateTimes()\n  }\n  async updateTimes() {\n    const activityId = this.getAttribute('activity-id')\n    if (activityId) {\n      const timeData = await getTimes()\n      const times = timeData\n      this.shadowRoot.querySelector('.container').innerHTML = `剩余抽奖次数：${times}`\n    } else {\n      useToast('剩余抽奖次数无活动ID')\n    }\n  }\n}\ncustomElements.define('mat-timelefttext', TimeLeftText)\n";

//驼峰转中划线
function toKebabCase(text) {
    return text.replace(/([A-Z])/g, '-$1').toLowerCase();
}
function isRegNumber(text) {
    const reg = /^-?([1-9][0-9]*|0)(.[0-9]+)?$/;
    const isNumber = new RegExp(reg);
    return isNumber.test(text);
}
function addRem(text, item) {
    if (isRegNumber(text) &&
        item !== 'zIndex' &&
        item !== 'animationDelay' &&
        item !== 'animationIterationCount' &&
        item !== 'opacity') {
        return (Number(text) / 37.5).toFixed(4) + 'rem';
    }
    return text;
}
function addRemWithMultiNumber(text) {
    const valueArr = text.split(' ');
    const newValueArr = valueArr.map((val) => {
        if (isRegNumber(val)) {
            return (Number(val) / 37.5).toFixed(4) + 'rem';
        }
        else {
            return val;
        }
    });
    return newValueArr.join(' ');
}
//jsx => css
function jsx2css(jsx) {
    let result = '';
    for (const item in jsx) {
        if (addRem(String(jsx[item]), item)) {
            if (item === 'transformOrigin') {
                result += `transform-origin: ${addRemWithMultiNumber(jsx[item])}`;
                continue;
            }
            result += toKebabCase(item) + ':' + addRem(String(jsx[item]), item) + ';';
        }
    }
    return result;
}
function getAttrValue(item) {
    if (typeof item === 'object' && item.value) {
        return item.value;
    }
    return item;
}
const dialogReg = /dialog/i;
const layoutReg = /layout/i;
const _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789';
/**
 * 随机生成索引
 * @param min 最小值
 * @param max 最大值
 * @param i 当前获取位置
 */
function RandomIndex(min, max, i) {
    let index = Math.floor(Math.random() * (max - min + 1) + min);
    const numStart = _charStr.length - 10;
    //如果字符串第一位是数字，则递归重新获取
    if (i == 0 && index >= numStart) {
        index = RandomIndex(min, max, i);
    }
    //返回最终索引值
    return index;
}
function getRandomString(len) {
    const min = 0, max = _charStr.length - 1;
    let _str = '';
    //判断是否指定长度，否则默认长度为15
    len = len || 15;
    //循环生成字符串
    for (let i = 0, index; i < len; i++) {
        index = RandomIndex(min, max, i);
        _str += _charStr[index];
    }
    return _str;
}

class BlockBuilder {
    constructor() { }
    getEventFunc = (event) => {
        if (!event.action)
            return null;
        if (event.disable)
            return null;
        return `${event.action}${event.param ? `('${event.param}')` : '()'}`;
    };
    getEventStr = (event) => {
        if (event) {
            return `onclick="${event}"`;
        }
        return '';
    };
    getCss = (block) => {
        if (block) {
            let animation = {};
            let keyframesStr = '';
            const randomKeyframsName = getRandomString(6);
            if (!block.animation.disable) {
                if (block.animation.animationName) {
                    animation = { ...block.animation };
                    delete animation.keyframes;
                }
                if (block.animation.animationName === '自定义动效') {
                    animation.animationName = randomKeyframsName;
                    keyframesStr = `@keyframes ${randomKeyframsName} {
            ${block.animation.keyframes?.steps
                        .map((val) => {
                        return `${val.percentNum} {
                    ${jsx2css(val.effectProperties)}
                  }`;
                    })
                        .join('') || ''}
          }`;
                }
            }
            const css = jsx2css({
                ...block.props.style,
                ...block.position,
                ...animation
            });
            const name = getRandomString(6);
            const cssStr = `${keyframesStr}\n .${name} {${css}}`;
            return { attr: `class="${name}"`, cssStr };
        }
        return { attr: '', cssStr: '' };
    };
    getSlotStr = () => {
        return `slot="content"`;
    };
    getChildrenStr = (block) => {
        if (block.blocks) {
            const buildElement = this.build(block.blocks);
            return { element: buildElement.blockStr, css: buildElement.cssStr };
        }
        return { element: '', css: '' };
    };
    getAttrTextStr = (block) => {
        if (getAttrValue(block.props.attr['text'])) {
            return getAttrValue(block.props.attr['text']);
        }
        return '';
    };
    getAttrsStr = (block) => {
        let attrStr = '';
        for (const attr in block.props.attr) {
            if (getAttrValue(attr)) {
                if (attr === 'text')
                    continue;
                attrStr += `${attr}="${typeof getAttrValue(block.props.attr[attr]) === 'string' ||
                    typeof getAttrValue(block.props.attr[attr]) === 'number'
                    ? getAttrValue(block.props.attr[attr])
                    : ''}"`;
            }
        }
        return attrStr;
    };
    getblockTag = (block) => {
        return `mat-${block.key.toLowerCase()}`;
    };
    getBlockItem = (block) => {
        const event = this.getEventFunc(block.event);
        if (block.key === 'baseLayout' ||
            block.key === 'blockLayout' ||
            block.key === 'tabHeader' ||
            block.key === 'tabHeaderItem' ||
            block.key === 'tabContent' ||
            block.key === 'tabHeaderItemActive' ||
            block.key === 'tabHeaderItemDeActive') {
            const CssObj = this.getCss(block);
            const ChildrenStr = this.getChildrenStr(block);
            return {
                element: `\n<${this.getblockTag(block)} ${CssObj.attr} ${this.getAttrsStr(block)} ${this.getEventStr(event)} ${this.getSlotStr()}>${ChildrenStr.element.trim() && ChildrenStr.element + '\n'}</${this.getblockTag(block)}>`,
                css: CssObj.cssStr + ChildrenStr.css
            };
        }
        else {
            const CssObj = this.getCss(block);
            return {
                element: `\n<${this.getblockTag(block)} ${CssObj.attr} ${this.getEventStr(event)} ${this.getAttrsStr(block)} ${this.getSlotStr()}>${this.getAttrTextStr(block)}</${this.getblockTag(block)}>`,
                css: CssObj.cssStr
            };
        }
    };
    build(blocks) {
        let blockStr = '';
        let cssStr = '';
        for (let i = 0; i < blocks.length; i++) {
            const blockItem = this.getBlockItem(blocks[i]);
            blockStr += blockItem.element;
            cssStr += blockItem.css;
        }
        return { blockStr, cssStr };
    }
}

class ContainerBuilder {
    options;
    Block;
    constructor(options) {
        this.options = options;
        this.Block = new BlockBuilder();
    }
    getCss = (container) => {
        if (container) {
            const css = jsx2css({
                ...container.props.style,
                ...container.position
            });
            const name = getRandomString(6);
            const cssStr = `.${name} {${css}}`;
            return { attr: `class="${name}"`, cssStr };
        }
        return { attr: '', cssStr: '' };
    };
    getAttrsStr = (container) => {
        let attrStr = '';
        for (const attr in container.props.attr) {
            if (getAttrValue(attr)) {
                attrStr += `${attr}="${typeof getAttrValue(container.props.attr[attr]) === 'string' ||
                    typeof getAttrValue(container.props.attr[attr]) === 'number'
                    ? getAttrValue(container.props.attr[attr])
                    : ''}"`;
            }
        }
        return attrStr;
    };
    getContainerTag = (container) => {
        if (container.key === 'showMoreLayout') {
            return 'mat-baselayout';
        }
        return `mat-${container.key.toLowerCase()}`;
    };
    builid(container) {
        const BlockItem = this.Block.build(container.blocks);
        if (layoutReg.test(container.key)) {
            const CssObj = this.getCss(container);
            return {
                element: `\n<${this.getContainerTag(container)} ${this.getAttrsStr(container)} ${CssObj.attr}>${BlockItem.blockStr.trim() && BlockItem.blockStr + '\n'}</${this.getContainerTag(container)}>`,
                css: CssObj.cssStr + BlockItem.cssStr
            };
        }
        else if (dialogReg.test(container.key)) {
            const CssObj = this.getCss(container);
            return {
                element: `\n<mat-dialog ${CssObj.attr} show="false" style="display:none;" name="${container.name}" >${BlockItem.blockStr}\n</mat-dialog>`,
                css: CssObj.cssStr + BlockItem.cssStr
            };
        }
    }
}

const prettierConfig = {
    singleQuote: true,
    trailingComma: 'none',
    printWidth: 100000,
    proseWrap: 'never',
    semi: false
};
class ProjectBuilder {
    Container;
    options;
    template;
    Chunks;
    CssStr;
    constructor(Schema, options) {
        this.Container = new ContainerBuilder(options);
        this.Chunks = [];
        this.CssStr = '';
        this.options = options;
        this.createChunk(Schema);
        const body = this.addBody();
        this.template = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      <title>${this.options.config.title || ''}</title>
      <link rel="icon" type="image/svg+xml" href="/funet.svg" />
      <link rel="stylesheet" href="./normalize.css">
      <link rel="stylesheet" href="./animation.css">
      <link rel="stylesheet" href="./index.css">
      <script src="./presets.js"></script>
      <script src="https://file.caixin.com/webjs/axios/1.2.2/axios.js"></script>
      <script src="https://file.caixin.com/webjs/wap/flexible.js" type="text/javascript" charset="utf-8"></script>
      </head>
    
    <body>
      <div id="app">
        ${body}
      </div>
    </body>

    <!-- 微信分享代码 -->
    <div style="display:none" id="wx_shareLogo">${this.options.config.sharedLogo || ''}</div>
    <div style="display:none" id="wx_shareTitle">${this.options.config.sharedTitle || ''}</div>
    <div style="display:none" id="wx_shareMessage">${this.options.config.sharedMessage || ''}</div>
    ${body.indexOf('BaseLayout'.toLowerCase()) > -1
            ? '<script src="./material/BaseLayout.js" type="module"></script>'
            : ''}${body.indexOf('BlockLayout'.toLowerCase()) > -1
            ? '<script src="./material/BlockLayout.js" type="module"></script>'
            : ''}${body.indexOf('Button'.toLowerCase()) > -1
            ? '<script src="./material/Button.js" type="module"></script>'
            : ''}${body.indexOf('CloseButton'.toLowerCase()) > -1
            ? '<script src="./material/CloseButton.js" type="module"></script>'
            : ''}${body.indexOf('CopyCouponButton'.toLowerCase()) > -1
            ? '<script src="./material/CopyCouponButton.js" type="module"></script>'
            : ''}${body.indexOf('Dialog'.toLowerCase()) > -1
            ? '<script src="./material/Dialog.js" type="module"></script>'
            : ''}${body.indexOf('DrawButton'.toLowerCase()) > -1
            ? '<script src="./material/DrawButton.js" type="module"></script>'
            : ''}${body.indexOf('ExchangeButton'.toLowerCase()) > -1
            ? '<script src="./material/ExchangeButton.js" type="module"></script>'
            : ''}${body.indexOf('Image'.toLowerCase()) > -1
            ? '<script src="./material/Image.js" type="module"></script>'
            : ''}${body.indexOf('InfoBox'.toLowerCase()) > -1
            ? '<script src="./material/InfoBox.js" type="module"></script>'
            : ''}${body.indexOf('InfoButton'.toLowerCase()) > -1
            ? '<script src="./material/InfoButton.js" type="module"></script>'
            : ''}${body.indexOf('Input'.toLowerCase()) > -1
            ? '<script src="./material/Input.js" type="module"></script>'
            : ''}${body.indexOf('LoginButton'.toLowerCase()) > -1
            ? '<script src="./material/LoginButton.js" type="module"></script>'
            : ''}${body.indexOf('PrizeBox'.toLowerCase()) > -1
            ? '<script src="./material/PrizeBox.js" type="module"></script>'
            : ''}${body.indexOf('PrizeButton'.toLowerCase()) > -1
            ? '<script src="./material/PrizeButton.js" type="module"></script>'
            : ''}${body.indexOf('ShareButton'.toLowerCase()) > -1
            ? '<script src="./material/ShareButton.js" type="module"></script>'
            : ''}${body.indexOf('ShowMoreButton'.toLowerCase()) > -1
            ? '<script src="./material/ShowMoreButton.js" type="module"></script>'
            : ''}${body.indexOf('SubmitButton'.toLowerCase()) > -1
            ? '<script src="./material/SubmitButton.js" type="module"></script>'
            : ''}${body.indexOf('TabContent'.toLowerCase()) > -1
            ? '<script src="./material/TabContent.js" type="module"></script>'
            : ''}${body.indexOf('TabHeader'.toLowerCase()) > -1
            ? '<script src="./material/TabHeader.js" type="module"></script>'
            : ''}${body.indexOf('TabHeaderItem'.toLowerCase()) > -1
            ? '<script src="./material/TabHeaderItem.js" type="module"></script>'
            : ''}${body.indexOf('TabHeaderItemActive'.toLowerCase()) > -1
            ? '<script src="./material/TabHeaderItemActive.js" type="module"></script>'
            : ''}${body.indexOf('TabHeaderItemDeActive'.toLowerCase()) > -1
            ? '<script src="./material/TabHeaderItemDeActive.js" type="module"></script>'
            : ''}${body.indexOf('TabLayout'.toLowerCase()) > -1
            ? '<script src="./material/TabLayout.js" type="module"></script>'
            : ''}${body.indexOf('Text'.toLowerCase()) > -1
            ? '<script src="./material/Text.js" type="module"></script>'
            : ''}${body.indexOf('TextArea'.toLowerCase()) > -1
            ? '<script src="./material/TextArea.js" type="module"></script>'
            : ''}${body.indexOf('TimeLeftText'.toLowerCase()) > -1
            ? '<script src="./material/TimeLeftText.js" type="module"></script>'
            : ''}
    <!-- 微信分享代码 -->
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <!-- 统计和分享代码 -->
    <script src="./bottom.js"></script>
    </html>`;
    }
    createChunk(Schema) {
        for (let i = 0; i < Schema.container.length; i++) {
            const buildContainer = this.Container.builid(Schema.container[i]);
            this.Chunks.push(buildContainer?.element);
            this.CssStr += buildContainer?.css;
        }
    }
    addBody() {
        let str = '';
        for (let i = 0; i < this.Chunks.length; i++) {
            str += this.Chunks[i];
        }
        return str;
    }
    compressZip() {
        const zip = new JSZip();
        zip.file('normalize.css', normalizeCss);
        zip.file('animation.css', animationCss);
        zip.file('presets.js', presetsJs);
        zip.file('bottom.js', bottomJs);
        const materialFolder = zip.folder('material');
        materialFolder?.file('BaseLayout.js', BaseLayout);
        materialFolder?.file('BlockLayout.js', BlockLayout);
        materialFolder?.file('Button.js', Button);
        materialFolder?.file('CloseButton.js', CloseButton);
        materialFolder?.file('CopyCouponButton.js', CopyCouponButton);
        materialFolder?.file('Dialog.js', Dialog);
        materialFolder?.file('DrawButton.js', DrawButton);
        materialFolder?.file('ExchangeButton.js', ExchangeButton);
        materialFolder?.file('Image.js', Image);
        materialFolder?.file('InfoBox.js', InfoBox);
        materialFolder?.file('InfoButton.js', InfoButton);
        materialFolder?.file('Input.js', Input);
        materialFolder?.file('LoginButton.js', LoginButton);
        materialFolder?.file('PrizeBox.js', PrizeBox);
        materialFolder?.file('PrizeButton.js', PrizeButton);
        materialFolder?.file('ShareButton.js', ShareButton);
        materialFolder?.file('ShowMoreButton.js', ShowMoreButton);
        materialFolder?.file('SubmitButton.js', SubmitButton);
        materialFolder?.file('TabContent.js', TabContent);
        materialFolder?.file('TabHeader.js', TabHeader);
        materialFolder?.file('TabHeaderItem.js', TabHeaderItem);
        materialFolder?.file('TabHeaderItemActive.js', TabHeaderItemActive);
        materialFolder?.file('TabHeaderItemDeActive.js', TabHeaderItemDeActive);
        materialFolder?.file('TabLayout.js', TabLayout);
        materialFolder?.file('Text.js', Text);
        materialFolder?.file('TextArea.js', TextArea);
        materialFolder?.file('TimeLeftText.js', TimeLeftText);
        const utilFolder = zip.folder('util');
        utilFolder?.file('apis.js', apis);
        utilFolder?.file('tools.js', tools);
        return zip;
    }
    browserGenerate() {
        const htmlTemplate = prettier.format(this.template, {
            ...prettierConfig,
            parser: 'html',
            plugins: [parserHtml]
        });
        const cssTemplate = prettier.format(indexCss + this.CssStr, {
            parser: 'css',
            plugins: [parserCss]
        });
        const zip = this.compressZip();
        zip.file('index.html', htmlTemplate);
        zip.file('index.css', cssTemplate);
        zip.generateAsync({ type: 'blob' }).then((content) => {
            FileSaver.saveAs(content, `${this.options.config.projectName || '代码'}.zip`);
        });
    }
    async deployGenerate() {
        const htmlTemplate = prettier.format(this.template, {
            ...prettierConfig,
            parser: 'html',
            plugins: [parserHtml]
        });
        const cssTemplate = prettier.format(indexCss + this.CssStr, {
            parser: 'css',
            plugins: [parserCss]
        });
        const zip = this.compressZip();
        zip.file('index.html', htmlTemplate);
        zip.file('index.css', cssTemplate);
        const deployZip = await zip.generateAsync({ type: 'blob' });
        return new File([deployZip], `${this.options.config.projectName || '代码'}.zip`);
    }
}

const generate = (schema, config) => {
    if (!schema)
        throw new Error('please input schema');
    const Project = new ProjectBuilder(schema, { config });
    Project.browserGenerate();
};
const preview = (schema, config) => {
    const Project = new ProjectBuilder(schema, { config });
    return { body: Project.addBody(), style: Project.CssStr };
};
const deploy = (schema, config) => {
    if (!schema)
        throw new Error('please input schema');
    const Project = new ProjectBuilder(schema, { config });
    return Project.deployGenerate();
};

export { deploy, generate, preview };
