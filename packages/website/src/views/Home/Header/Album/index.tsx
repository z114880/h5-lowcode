import React, { FC, useContext, useState, useEffect, memo } from 'react'
import { Modal, Button, message, Upload } from 'antd'
import type { UploadProps } from 'antd'
import { SchemaContext } from '@/utils/context'
import { getPhotoListApi } from '@/apis'
import classnames from 'classnames'
import { getBaseUrl } from '@/utils/tools'
import { deBounce } from '@/utils/tools'
import { useTranslation } from 'react-i18next'
import styles from './index.module.scss'
type propsType = {
  isOpen: boolean
  closeAlbum: BaseFunction
}

const Album: FC<propsType> = (props) => {
  const { state } = useContext(SchemaContext)
  const { pageConfig } = state
  const [photoList, setPhotoList] = useState<Array<any>>([])
  const deBounceList = deBounce(getPhotoListApi, 1000)
  const { t } = useTranslation()
  const uploadProps: UploadProps = {
    name: 'file',
    action: getBaseUrl() + '/file/save',
    accept: 'image/*',
    multiple: true,
    data: {
      folderName: pageConfig.projectName,
      operatorId: '1',
      type: 'img'
    },
    async onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
        if (pageConfig.projectName && props.isOpen) {
          fetchList()
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
  async function fetchList() {
    const res = await deBounceList({ folderName: pageConfig.projectName! })
    setPhotoList(res.data)
  }
  useEffect(() => {
    if (pageConfig.projectName && props.isOpen) {
      fetchList()
    }
  }, [props.isOpen])

  const onClipBoard = (str: string) => {
    return async () => {
      try {
        //clipboard Api只能在https或者localhost中调用
        await navigator.clipboard.writeText(str)
        message.success(t('header.copiedToClipboard'))
      } catch (e) {
        console.log(e)
        message.error(t('header.httpsLocalhostOnly'))
      }
    }
  }
  const PhotoItem = (fileName: string, ind: number) => (
    <div
      key={ind}
      className="flex flex-col items-center w-32 h-[250px] border border-gray-200 rounded-md overflow-hidden"
    >
      <img
        className="w-32 h-[112px] object-contain"
        src={'https://www.funet.top/pages/' + pageConfig.projectName + '/img/' + fileName}
        alt=""
      />
      <div className={classnames(styles.overflowLine4, 'w-full p-1 flex-1 h-[96px]')}>
        {'https://www.funet.top/pages/' + pageConfig.projectName + '/img/' + fileName}
      </div>
      <Button
        type="primary"
        className="w-20 mb-2"
        onClick={onClipBoard(
          'https://www.funet.top/pages/' + pageConfig.projectName + '/img/' + fileName
        )}
      >
        {t('header.copy')}
      </Button>
    </div>
  )
  return (
    <Modal
      width={1250}
      open={props.isOpen}
      onCancel={props.closeAlbum}
      onOk={props.closeAlbum}
      closable={false}
    >
      <div className="w-full h-[510px] flex">
        <div className="h-[510px] overflow-y-scroll flex flex-wrap gap-2 flex-1">
          {photoList.map((val, ind) => {
            return PhotoItem(val.fileName, ind)
          })}
        </div>
        <div className="w-[160px] h-[510px] flex flex-col">
          <Upload {...uploadProps}>
            <Button className="w-[120px]" type="primary">
              {t('header.uploadImage')}
            </Button>
          </Upload>
        </div>
      </div>
    </Modal>
  )
}
export default memo(Album)
