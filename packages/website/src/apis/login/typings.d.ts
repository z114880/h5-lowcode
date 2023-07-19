import { responseData } from '../index'
declare namespace API {
  type loginParams = {
    email: string
    password: string
  }
  type loginResponse = responseData<Record<string, any>>
  type loadUserMessResponse = responseData<Record<string, any>>
}
