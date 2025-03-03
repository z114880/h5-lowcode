import React, { FC, useContext, memo } from 'react'
import { Modal } from 'antd'
import { SchemaContext } from '@/utils/context'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'

type propsType = {
  isOpen: boolean
  closeEditor: BaseFunction
}

const Editor: FC<propsType> = (props) => {
  const { state, dispatch } = useContext(SchemaContext)
  const { pageConfig } = state

  return (
    <Modal
      width={1250}
      open={props.isOpen}
      onCancel={props.closeEditor}
      onOk={props.closeEditor}
      closable={false}
    >
      <div className="w-full">
        <CodeMirror
          value={pageConfig.additonalCode}
          height="600px"
          extensions={[javascript({ jsx: true })]} // 启用 JSX 支持
          onChange={(val: string) => {
            dispatch({
              type: 'setPageConfig',
              payload: {
                ...pageConfig,
                additonalCode: val
              }
            })
          }}
        />
      </div>
    </Modal>
  )
}
export default memo(Editor)
