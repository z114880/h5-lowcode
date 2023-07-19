import { request } from '@/utils/request'
import { API } from './typings'
//上传
export const uploadApi = (
  data: API.uploadParams,
  onUploadProgress?: BaseFunction
): Promise<API.uploadResponse> =>
  request({
    url: `/file/save`,
    method: 'post',
    data,
    onUploadProgress
  })

export const getPhotoListApi = (
  params: API.getPhotoListParams
): Promise<API.getPhotoListResponse> =>
  request({
    url: `/file/getPhotoList`,
    method: 'get',
    params
  })
