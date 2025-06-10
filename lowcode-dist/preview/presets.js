/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
window.isInGenerated = true
window.isInProduction = window.location.hostname === 'www.funet.top'

const openDialog = (name) => {
  document.getElementsByName(name)[0].setAttribute('show', true)
}

const openLink = (link) => {
  window.location.href = link
}

const backTop = () => {
  document.body.scrollIntoView({ behavior: 'smooth' })
}

function cxLoginSuccess() {
  window.location.reload()
}
function cxLogoutSuccess() {
  window.location.reload()
}
