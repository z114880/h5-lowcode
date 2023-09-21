/**
 * 获取nodeEnv
 */
export const getNodeEnv: () => 'development' | 'production' | undefined = () => {
  if (process.env.NODE_ENV === 'development') return 'development'
  else if (process.env.NODE_ENV === 'production') return 'production'
  else return undefined
}

/**
 * 获取baseUrl
 */
export const getBaseUrl = (): string | undefined => {
  if (getNodeEnv() === 'development') return 'https://www.funet.top/api'
  else if (getNodeEnv() === 'production') return 'https://www.funet.top/api'
  return undefined
}

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
export function addPx(text: string, item: string) {
  if (isRegNumber(text) && item !== 'zIndex' && item !== 'animationDelay' && item !== 'opacity') {
    return text + 'px'
  }
  return text
}

//jsx => css
export function jsx2css(jsx: Record<string, any>) {
  let result = ''
  for (const item in jsx) {
    if (addPx(String(jsx[item]), item))
      result += toKebabCase(item) + ':' + addPx(String(jsx[item]), item) + ';'
  }
  return result
}

export function addPxWithMultiNumber(text: string) {
  const valueArr = text.split(' ')
  const newValueArr = valueArr.map((val) => {
    if (isRegNumber(val)) {
      return val + 'px'
    } else {
      return val
    }
  })
  return newValueArr.join(' ')
}

export function mapJsxPx(jsx: Record<string, any>) {
  for (const item in jsx) {
    if (item === 'transformOrigin') {
      jsx[item] = addPxWithMultiNumber(jsx[item])
    }
    jsx[item] = addPx(String(jsx[item]), item)
  }
  return jsx
}

export function getAttrValue(item: Record<string, any> | string | number) {
  if (typeof item === 'object' && item.value) {
    return item.value
  }
  return item
}

export function deBounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  // eslint-disable-next-line no-undef
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    return new Promise((resolve) => {
      timeoutId = setTimeout(() => {
        const result = func(...args)
        resolve(result)
      }, wait)
    })
  }
}

export function isNumber(value: any) {
  return typeof value === 'number' && isFinite(value) && !isNaN(value)
}

export const dialogReg = /dialog/i
export const layoutReg = /layout/i

export const broadCastChannel = new BroadcastChannel('Schema')
