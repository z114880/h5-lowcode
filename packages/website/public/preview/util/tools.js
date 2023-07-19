const isInEditor = () => {
  return window.isInEditor
}
const isInGenerated = () => {
  return window.isInGenerated
}
function login() {
  useToast('登录成功')
}
const useToast = (text, time) => {
  const toastElement = document.createElement('div')
  toastElement.innerHTML = text
  toastElement.className = 'toast'
  toastElement.style.left = '50%'
  document.body.appendChild(toastElement)
  toastElement.style.transform = `translate(-${toastElement.clientWidth / 2}px`
  toastElement.classList.add('toastEnd')
  setTimeout(
    () => {
      toastElement.remove()
    },
    time ? time : 1500
  )
}
function createElementFromHTML(htmlString) {
  const div = document.createElement('div')
  div.innerHTML = htmlString.trim()
  return div.firstChild
}
function copyToClipBoard(text) {
  if (document.execCommand) {
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    if (document.execCommand('copy')) {
      useToast('复制成功！')
    } else {
      useToast('复制失败，请手动复制')
    }
    document.body.removeChild(el)
  } else if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        useToast('复制成功！')
      })
      .catch(() => {
        useToast('复制失败，请手动复制')
      })
  } else {
    useToast('复制失败，请手动复制')
  }
}
const openLoading = () => {
  const element = createElementFromHTML(`<div class="loadingWrap" id="PageLoading">
      <div class="loadEffect">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>`)
  document.body.appendChild(element)
}
const closeLoading = () => {
  const loading = document.getElementById('PageLoading')
  if (loading) loading.remove()
}

export {
  closeLoading,
  copyToClipBoard,
  createElementFromHTML,
  isInEditor,
  isInGenerated,
  login,
  openLoading,
  useToast
}
