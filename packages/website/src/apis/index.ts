export * from './login'
export * from './upload'

export interface responseData<T> {
  config: Record<string, any>
  data: T
  headers: Record<string, any>
  request: Record<string, any>
  status: number
  statusText: string
}
