import { responseData } from '../index'
declare namespace API {
  type uploadParams = FormData<{
    file: File
    folderName: string
    operatorId: string
    type: 'img' | 'zip'
  }>
  type uploadResponse = responseData<Record<string, any>>
  type getPhotoListParams = {
    folderName: string
  }
  type getPhotoListResponse = responseData<any[]>
}
