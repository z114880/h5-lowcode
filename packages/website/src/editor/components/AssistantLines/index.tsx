import { FC, useContext } from 'react'
import AssistantLineX from './AssistantLineX'
import AssistantLineY from './AssistantLineY'
import { SchemaContext } from '@/utils/context'

type propsType = {
  height: number
}

const AssistantLines: FC<propsType> = (props) => {
  const { height } = props
  const { state } = useContext(SchemaContext)

  return (
    <>
      {state.showLine &&
        state.assistantLineXArr.map(
          (
            val: {
              value: number
              tipPos: { left: number; top: number; show: boolean }
              editor: string
            },
            ind: number
          ) => {
            return (
              <AssistantLineX
                key={ind}
                index={ind}
                left={val.value}
                tipPos={val.tipPos}
                height={height}
                editor={val.editor}
              />
            )
          }
        )}
      {state.showLine &&
        state.assistantLineYArr.map(
          (
            val: {
              value: number
              tipPos: { left: number; top: number; show: boolean }
              editor: string
            },
            ind: number
          ) => {
            return (
              <AssistantLineY
                key={ind}
                index={ind}
                top={val.value}
                tipPos={val.tipPos}
                editor={val.editor}
              />
            )
          }
        )}
    </>
  )
}

export default AssistantLines
