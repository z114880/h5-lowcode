import { preview } from '@lowcode-packages/code-generator'
import { deBounce } from '@/utils/tools'
;(window as any).isInPreview = true
const broadCastChannel = new BroadcastChannel('Schema')
const initialCastChannel = new BroadcastChannel('Init')

initialCastChannel.postMessage('init')
const onMessage = function (e: any) {
  const previewObj = preview(e.data, {
    projectName: '',
    title: '',
    sharedTitle: '',
    sharedMessage: '',
    sharedLogo: ''
  })
  document.getElementById('app')!.innerHTML = previewObj.body
  let styleTag
  if (document.getElementById('previewStyle')) {
    styleTag = document.getElementById('previewStyle')
  } else {
    styleTag = document.createElement('style')
    styleTag.id = 'previewStyle'
  }
  styleTag!.innerHTML = previewObj.style
  document.head.appendChild(styleTag!)
  const script = document.createElement('script')
  script.innerHTML = previewObj.bottom
  const bottomScript = document.getElementById('bottomScript')!
  if (bottomScript.innerHTML) {
    bottomScript!.innerHTML = ''
  }
  bottomScript.appendChild(script)
}

broadCastChannel.onmessage = deBounce(onMessage, 1000)
