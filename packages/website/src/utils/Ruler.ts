type paramsType = {
  width: number
  height: number
  background?: string
  color?: string
  markColor?: string
  canvasWidth?: number
  canvasHeight?: number
  showLastNum?: boolean
  mark?: number
}
const Ruler = {
  /**
   * @width 刻度尺宽度 Number
   * @height 刻度尺高度 Number
   * @canvasWidth canvas宽度 Number
   * @canvasHeight canvas高度 Number
   * @background 刻度尺背景颜色 String
   * @color 刻度线和字体的颜色 String
   * @markColor 标记点颜色 String
   * @mark 标记点
   * @showLastNum 显示最后刻度 Boolean
   * */
  initRow: function (params: paramsType) {
    const initData = {
      width: params.width || 60,
      height: params.height || 60,
      background: params.background || '',
      color: params.color || '',
      markColor: params.markColor || '#FFCC33',
      canvasWidth: params.canvasWidth || params.width,
      canvasHeight: params.canvasHeight || params.height,
      showLastNum: params.showLastNum || '',
      mark: params.mark
    }
    const count = 0 // 初始值
    const division = 10
    const drawCount = initData.width // 刻度数量
    const canvas = document.createElement('canvas') // 创建canvas标签
    canvas.width = initData.canvasWidth
    canvas.height = initData.canvasHeight + 1
    const cxt = canvas.getContext('2d')!
    if (window.devicePixelRatio) {
      canvas.width = window.devicePixelRatio * initData.canvasWidth
      canvas.height = window.devicePixelRatio * initData.canvasHeight + 1
      cxt.scale(window.devicePixelRatio, window.devicePixelRatio)
      cxt.translate(1 / window.devicePixelRatio, 0)
    }
    // 画刻度尺
    function drawRuler(count: number) {
      // 清空画布
      cxt.clearRect(0, 0, initData.width, initData.height)
      // 刻度尺背景
      if (initData.background) {
        cxt.fillStyle = initData.background
        cxt.fillRect(0, 0, initData.width, initData.height)
      }
      // 画刻度线
      for (let i = 0; i <= drawCount / 10; i++) {
        cxt.beginPath()
        cxt.save()
        cxt.strokeStyle = initData.color ? initData.color : '#666'
        cxt.lineWidth = 1
        cxt.lineCap = 'round'
        const x = division * i - count
        cxt.moveTo(x, initData.height)
        if (i % 10 === 0) {
          cxt.font = '8px Arial'
          cxt.fillStyle = initData.color ? initData.color : '#333'
          cxt.textAlign = 'left'
          cxt.textBaseline = 'middle'
          cxt.lineTo(x, 0)
          cxt.fillText(String(i * division), x + 2, Math.floor(initData.height * 0.5))
        } else if (i % 5 === 0) {
          cxt.lineTo(x, Math.floor(initData.height * 0.5))
        } else {
          cxt.strokeStyle = initData.color ? initData.color : '#bbb'
          cxt.lineTo(x, Math.floor(initData.height * 0.8))
        }
        cxt.stroke()
        cxt.restore()
        cxt.closePath()
      }
      if (initData.showLastNum) {
        cxt.font = '8px Arial'
        cxt.fillStyle = initData.color ? initData.color : '#333'
        cxt.textAlign = 'left'
        cxt.textBaseline = 'middle'
        cxt.beginPath()
        cxt.save()
        cxt.moveTo(initData.width, initData.height)
        cxt.lineTo(initData.width, 0)
        cxt.fillText(String(initData.width), 375 + 2, Math.floor(initData.height * 0.5))
        cxt.stroke()
        cxt.restore()
        cxt.closePath()
      }
      if (initData.mark) {
        cxt.font = '8px Arial'
        cxt.strokeStyle = initData.markColor ? initData.markColor : '#FFA5A5'
        cxt.textAlign = 'left'
        cxt.textBaseline = 'middle'
        cxt.beginPath()
        cxt.save()
        cxt.moveTo(initData.mark, initData.height)
        cxt.lineTo(initData.mark, initData.height * 0.5)
        cxt.stroke()
        cxt.restore()
        cxt.closePath()
      }
      // 底部线条
      cxt.beginPath()
      cxt.save()
      cxt.strokeStyle = initData.color ? initData.color : '#bbb'
      cxt.lineWidth = 1
      cxt.lineCap = 'round'
      cxt.moveTo(1, initData.height)
      cxt.lineTo(initData.width, initData.height)
      cxt.stroke()
      cxt.restore()
      cxt.closePath()
    }
    if (window.devicePixelRatio) {
      canvas.style.transform = 'scale(' + 1 / window.devicePixelRatio + ')'
      canvas.style.transformOrigin = 'left top'
    }
    drawRuler(count)
    return canvas
  },
  initColumn: function (params: paramsType) {
    const initData = {
      width: params.width || 60,
      height: params.height || 60,
      background: params.background || '',
      color: params.color || '',
      markColor: params.markColor || '#FFCC33',
      canvasWidth: params.canvasWidth || params.width,
      canvasHeight: params.canvasHeight || params.height,
      showLastNum: params.showLastNum || '',
      mark: params.mark
    }
    const count = 0 // 初始值
    const division = 10
    const drawCount = initData.height // 刻度数量

    const canvas = document.createElement('canvas') // 创建canvas标签
    canvas.width = initData.canvasWidth + 1
    canvas.height = initData.canvasHeight

    const cxt = canvas.getContext('2d')!
    if (window.devicePixelRatio) {
      canvas.width = window.devicePixelRatio * initData.canvasWidth + 1
      canvas.height = window.devicePixelRatio * initData.canvasHeight
      cxt.scale(window.devicePixelRatio, window.devicePixelRatio)
      cxt.translate(0, 1 / window.devicePixelRatio)
    }
    // 画刻度尺
    function drawRuler(count: number) {
      // 清空画布
      cxt.clearRect(0, 0, initData.width, initData.height)
      // 刻度尺背景
      if (initData.background) {
        cxt.fillStyle = initData.background
        cxt.fillRect(0, 0, initData.width, initData.height)
      }
      // 画刻度线
      for (let i = 0; i <= drawCount / 10; i++) {
        cxt.beginPath()
        cxt.save()
        cxt.strokeStyle = initData.color ? initData.color : '#666'
        cxt.lineWidth = 1
        cxt.lineCap = 'round'
        const y = division * i - count * division
        cxt.moveTo(initData.width, y)
        if (i % 10 === 0) {
          cxt.font = '8px Arial'
          cxt.fillStyle = initData.color ? initData.color : '#333'
          cxt.textAlign = 'left'
          cxt.textBaseline = 'middle'
          cxt.lineTo(0, y)
          cxt.fillText(String(i * division), 1, y + 7)
        } else if (i % 5 === 0) {
          cxt.lineTo(Math.floor(initData.width * 0.5), y)
        } else {
          cxt.strokeStyle = initData.color ? initData.color : '#bbb'
          cxt.lineTo(Math.floor(initData.width * 0.8), y)
        }
        cxt.stroke()
        cxt.restore()
        cxt.closePath()
      }
      if (initData.showLastNum) {
        cxt.font = '8px Arial'
        cxt.fillStyle = initData.color ? initData.color : '#333'
        cxt.textAlign = 'left'
        cxt.textBaseline = 'middle'
        cxt.beginPath()
        cxt.save()
        cxt.moveTo(0, initData.height)
        cxt.lineTo(initData.width, initData.height)
        cxt.fillText(String(initData.height), 1, initData.height + 7)
        cxt.stroke()
        cxt.restore()
        cxt.closePath()
      }
      if (initData.mark) {
        cxt.font = '8px Arial'
        cxt.strokeStyle = initData.markColor ? initData.markColor : '#FFA5A5'
        cxt.textAlign = 'left'
        cxt.textBaseline = 'middle'
        cxt.beginPath()
        cxt.save()
        cxt.moveTo(initData.width, initData.mark)
        cxt.lineTo(initData.width * 0.5, initData.mark)
        cxt.stroke()
        cxt.restore()
        cxt.closePath()
      }
      //左边线条
      cxt.beginPath()
      cxt.save()
      cxt.strokeStyle = initData.color ? initData.color : '#bbb'
      cxt.lineWidth = 1
      cxt.lineCap = 'round'
      cxt.moveTo(initData.width, 1)
      cxt.lineTo(initData.width, initData.height)
      cxt.stroke()
      cxt.restore()
      cxt.closePath()
    }
    if (window.devicePixelRatio) {
      canvas.style.transform = 'scale(' + 1 / window.devicePixelRatio + ')'
      canvas.style.transformOrigin = 'left top'
    }
    drawRuler(count)
    // 最后将canvas节点返回
    return canvas
  }
}
export default Ruler
