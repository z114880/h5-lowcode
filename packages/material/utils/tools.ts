export const isInEditor = () => {
  return (window as any).isInEditor
}

export const isInGenerated = () => {
  return (window as any).isInGenerated
}

export const isInPreview = () => {
  return (window as any).isInPreview
}

export const isInProduction = () => {
  return (window as any).isInProduction
}

export const needProxy = () => {
  if (isInEditor()) return isInEditor() && (window as any).viteEnv === 'development'
  else if (isInPreview() && !isInProduction()) return true
  return false
}

export function getCookie(name: string) {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

export function checkLogin() {
  //获取登录信息（验证登录信息是否有效）
  return true
}

export function login() {
  useToast('登录成功')
}

export const useToast = (text: string, time?: number): void => {
  const toastElement = document.createElement('div') as HTMLElement
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

export function createElementFromHTML(htmlString: string) {
  const div = document.createElement('div')
  div.innerHTML = htmlString.trim()
  return div.firstChild
}

export function copyToClipBoard(text: string) {
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

export const openLoading = () => {
  const element = createElementFromHTML(
    `<div class="loadingWrap" id="PageLoading">
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
    </div>`
  )!
  document.body.appendChild(element)
}

export const closeLoading = () => {
  const loading = document.getElementById('PageLoading')
  if (loading) loading.remove()
}
