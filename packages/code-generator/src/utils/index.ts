//驼峰转中划线
function toKebabCase(text: string) {
  return text.replace(/([A-Z])/g, '-$1').toLowerCase()
}

//中划线转驼峰
export function toCamelCase(name: string) {
  return name.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

export function isRegNumber(text: string) {
  const reg = /^-?([1-9][0-9]*|0)(.[0-9]+)?$/
  const isNumber = new RegExp(reg)
  return isNumber.test(text)
}

export function addRem(text: string, item: string) {
  if (text === '0') {
    return ''
  }
  if (
    isRegNumber(text) &&
    item !== 'zIndex' &&
    item !== 'animationDelay' &&
    item !== 'animationIterationCount' &&
    item !== 'opacity'
  ) {
    return (Number(text) / 37.5).toFixed(4) + 'rem'
  }
  return text
}
export function addRemWithMultiNumber(text: string) {
  const valueArr = text.split(' ')
  const newValueArr = valueArr.map((val) => {
    if (isRegNumber(val)) {
      return (Number(val) / 37.5).toFixed(4) + 'rem'
    } else {
      return val
    }
  })
  return newValueArr.join(' ')
}
//jsx => css
export function jsx2css(jsx: Record<string, any>) {
  let result = ''
  for (const item in jsx) {
    if (addRem(String(jsx[item]), item)) {
      if (item === 'transformOrigin') {
        result += `transform-origin: ${addRemWithMultiNumber(jsx[item])}`
        continue
      }
      result += toKebabCase(item) + ':' + addRem(String(jsx[item]), item) + ';'
    }
  }
  return result
}

export function getAttrValue(item: Record<string, any> | string | number) {
  if (typeof item === 'object' && item.value) {
    return item.value
  }
  return item
}

export const dialogReg = /dialog/i
export const layoutReg = /layout/i

const _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789'

/**
 * 随机生成索引
 * @param min 最小值
 * @param max 最大值
 * @param i 当前获取位置
 */
export function RandomIndex(min: number, max: number, i: number) {
  let index = Math.floor(Math.random() * (max - min + 1) + min)
  const numStart = _charStr.length - 10
  //如果字符串第一位是数字，则递归重新获取
  if (i == 0 && index >= numStart) {
    index = RandomIndex(min, max, i)
  }
  //返回最终索引值
  return index
}

export function getRandomString(len: number) {
  const min = 0,
    max = _charStr.length - 1
  let _str = ''
  //判断是否指定长度，否则默认长度为15
  len = len || 15
  //循环生成字符串
  for (let i = 0, index; i < len; i++) {
    index = RandomIndex(min, max, i)
    _str += _charStr[index]
  }
  return _str
}
