import { FC, useContext } from 'react'
import { registerConfig } from '@/components/EditableMaterial'
import styles from './index.module.scss'
import classNames from 'classnames'
import useBlockDragger from '@/editor/hooks/useBlockDragger'
import useKeyframeBlockDragger from '@/editor/hooks/useKeyframeBlockDragger'
import { blockType } from '@/editor/types'
import Resizer from '@/editor/components/Resizer'
import useFocus from '@/editor/hooks/useFocus'
import { SchemaContext } from '@/utils/context'
import Line from '@/editor/components/AnimationLine'
import KeyframeBlockResizer from '@/editor/components/Resizer/KeyframeResizer'
import { useContextMenu } from 'react-contexify'
import 'react-contexify/ReactContexify.css'
import { isNumber } from '@/utils/tools'

type PropsType = {
  block: blockType
  containerIndex: number
  blockIndex: number[]
  slotName?: string
}

const noModalEleArr = ['infoBox', 'text']

const MENU_ID = 'rightPannel'

const EditorBlock: FC<PropsType> = (props) => {
  const { state, dispatch } = useContext(SchemaContext)

  const { block, containerIndex, blockIndex, slotName } = props

  const { keyframes } = block.animation

  const { mouseDown } = useBlockDragger(block, containerIndex, blockIndex)

  const { mouseDown: stepMouseDown } = useKeyframeBlockDragger(block, containerIndex, blockIndex)

  const { handleClick, isFocusing } = useFocus(
    dispatch,
    state.focusing,
    block.key,
    containerIndex,
    blockIndex
  )

  const setAnimation = () => {
    const { focusing } = state
    if (
      focusing?.containerIndex === containerIndex &&
      JSON.stringify(focusing.blockIndex) === JSON.stringify(blockIndex)
    ) {
      return state.animation as Record<string, any>
    } else {
      return {}
    }
  }
  const animation = setAnimation()

  const getKeyframeBlocks = () => {
    if (keyframes)
      return keyframes.steps.map((val) => {
        return {
          percent: val.percentNum,
          width: Number(val.effectProperties.width),
          height: Number(val.effectProperties.height),
          left: Number(val.effectProperties.left),
          top: Number(val.effectProperties.top),
          backgroundColor: val.effectProperties.backgroundColor || '',
          opacity: val.effectProperties.opacity || '',
          transform: val.effectProperties.transform || '',
          transformOrigin: val.effectProperties.transformOrigin || ''
        }
      })
    return []
  }

  const KeyframeBlocks = getKeyframeBlocks()

  const Lines = () => {
    const LinesArr = []
    if (KeyframeBlocks[0] && KeyframeBlocks[0].percent !== '0%') {
      LinesArr.push({
        startObj: {
          width: block.position.width,
          height: block.position.height,
          left: block.position.left,
          top: block.position.top
        },
        endObj: {
          width: KeyframeBlocks[0].width,
          height: KeyframeBlocks[0].height,
          left: KeyframeBlocks[0].left,
          top: KeyframeBlocks[0].top
        },
        zIndex: block.position.zIndex - 1
      })
    }
    KeyframeBlocks.forEach((_val, ind) => {
      if (ind > 0) {
        LinesArr.push({
          startObj: {
            width: KeyframeBlocks[ind - 1].width,
            height: KeyframeBlocks[ind - 1].height,
            left: KeyframeBlocks[ind - 1].left,
            top: KeyframeBlocks[ind - 1].top
          },
          endObj: {
            width: KeyframeBlocks[ind].width,
            height: KeyframeBlocks[ind].height,
            left: KeyframeBlocks[ind].left,
            top: KeyframeBlocks[ind].top
          },
          zIndex: block.position.zIndex - 1
        })
      }
    })
    if (
      KeyframeBlocks.length - 1 > 0 &&
      KeyframeBlocks[KeyframeBlocks.length - 1].percent !== '100%'
    ) {
      LinesArr.push({
        startObj: {
          width: KeyframeBlocks[KeyframeBlocks.length - 1].width,
          height: KeyframeBlocks[KeyframeBlocks.length - 1].height,
          left: KeyframeBlocks[KeyframeBlocks.length - 1].left,
          top: KeyframeBlocks[KeyframeBlocks.length - 1].top
        },
        endObj: {
          width: block.position.width,
          height: block.position.height,
          left: block.position.left,
          top: block.position.top
        },
        zIndex: block.position.zIndex - 1
      })
    }
    return LinesArr
  }

  const { show } = useContextMenu({
    id: MENU_ID
  })

  const resizeLeft = isNumber(block?.position?.width)
  const resizeRight = isNumber(block?.position?.width)
  const resizeTop = isNumber(block?.position?.height)
  const resizeBottom = isNumber(block?.position?.height)
  const resizeRightBottom = isNumber(block?.position?.width) && isNumber(block?.position?.height)

  return (
    <>
      <div
        className={classNames(
          styles.editorBlock,
          'border border-blue-200 cursor-pointer',
          isFocusing ? 'border-solid' : 'border-dashed',
          noModalEleArr.includes(block.key) ? 'after:content-unset' : ''
        )}
        onMouseDown={block.props.style.position === 'absolute' ? mouseDown : undefined}
        onClick={handleClick}
        style={{ ...block.position, ...animation, position: block.props.style.position }}
        slot={slotName ? slotName : ''}
        onContextMenu={(event) => {
          event.stopPropagation()
          show({
            event,
            props: {
              containerIndex,
              blockIndex
            }
          })
        }}
      >
        <Resizer
          type="block"
          containerIndex={containerIndex}
          blockIndex={blockIndex}
          left={resizeLeft}
          right={resizeRight}
          bottom={resizeBottom}
          top={resizeTop}
          rightBottom={resizeRightBottom}
          isFocusing={isFocusing}
          isContainer={false}
        >
          {registerConfig.componentMap[block.key].editor(
            {
              ...block.props.style
            },
            { ...block.props.attr }
          )}
        </Resizer>
      </div>
      {isFocusing &&
        state.activeTabKey === '2' &&
        KeyframeBlocks.map((val, ind) => {
          return (
            <div
              key={ind}
              slot="content"
              className="absolute border border-blue-100 cursor-pointer border-solid"
              style={{
                width: val.width,
                height: val.height,
                left: val.left,
                top: val.top,
                zIndex: block.position.zIndex
              }}
              onMouseDown={stepMouseDown(ind)}
              onClick={(e) => e.stopPropagation()}
            >
              <KeyframeBlockResizer
                type="block"
                containerIndex={containerIndex}
                blockIndex={blockIndex}
                left={true}
                right={true}
                bottom={true}
                top={true}
                rightBottom={true}
                isFocusing={isFocusing}
                isContainer={false}
                keyframeIndex={ind}
              >
                {registerConfig.componentMap[block.key].editor(
                  {
                    ...block.props.style,
                    backgroundColor: val.backgroundColor,
                    opacity: val.opacity,
                    transform: val.transform,
                    transformOrigin: val.transformOrigin
                  },
                  { ...block.props.attr }
                )}
              </KeyframeBlockResizer>
            </div>
          )
        })}
      {isFocusing &&
        state.activeTabKey === '2' &&
        Lines().map((val, ind: number) => {
          return <Line key={ind} startObj={val.startObj} endObj={val.endObj} zIndex={val.zIndex} />
        })}
    </>
  )
}
export default EditorBlock
