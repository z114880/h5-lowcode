/* eslint-disable no-console */
import { getBaseUrl } from './tools'
import axios, { Axios, AxiosRequestConfig } from 'axios'

interface myAxiosInstance extends Axios {
  <T>(config: AxiosRequestConfig): Promise<T>
  <T>(url: string, config?: AxiosRequestConfig): Promise<T>
}

const request: myAxiosInstance = axios.create({
  baseURL: getBaseUrl()
})

export { request }
