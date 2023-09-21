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
    `
    <div class="loadingWrap" id="PageLoading">
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
      <style>
        .loadingWrap {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          top: 0;
          z-index: 9999;
        }
        .loadEffect {
          width: 100px;
          height: 100px;
          position: relative;
          transform: scale(0.5);
        }
        .loadEffect span {
          display: inline-block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          position: absolute;
          animation: load 1.04s ease infinite;
        }
        @keyframes load {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0.2;
          }
        }
        .loadEffect span:nth-child(1) {
          left: 1px;
          top: 50%;
          margin-top: -8px;
          animation-delay: 0.13s;
        }

        .loadEffect span:nth-child(2) {
          left: 14px;
          top: 14px;
          animation-delay: 0.26s;
        }

        .loadEffect span:nth-child(3) {
          left: 50%;
          top: 4px;
          margin-left: -8px;
          animation-delay: 0.39s;
        }

        .loadEffect span:nth-child(4) {
          top: 14px;
          right: 14px;
          animation-delay: 0.52s;
        }

        .loadEffect span:nth-child(5) {
          right: 1px;
          top: 50%;
          margin-top: -8px;
          animation-delay: 0.65s;
        }

        .loadEffect span:nth-child(6) {
          right: 14px;
          bottom: 14px;
          animation-delay: 0.78s;
        }

        .loadEffect span:nth-child(7) {
          bottom: 4px;
          left: 50%;
          margin-left: -8px;
          animation-delay: 0.91s;
        }

        .loadEffect span:nth-child(8) {
          bottom: 14px;
          left: 14px;
          animation-delay: 1.04s;
        }
      </style>
    </div>
    `
  )!
  document.body.appendChild(element)
}

export const closeLoading = () => {
  const loading = document.getElementById('PageLoading')
  if (loading) loading.remove()
}
