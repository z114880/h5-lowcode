declare type BaseFunction = (...args: any[]) => any | void | (() => void)
declare type BasePromiseFunction = (...args: any[]) => Promise<any> | BaseFunction

declare type Nullable<T> = T extends Record<string, any>
  ? {
      [P in keyof T]: T[P] | null
    }
  : null | T

declare type nullable<T> = null | T

interface Window {
  enableClick: boolean
  isInEditor: boolean
  viteEnv: string
  axios: any
}

declare module '@lowcode-packages/code-generator'
