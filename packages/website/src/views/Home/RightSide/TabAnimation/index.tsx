import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { Button, InputNumber, message, Switch, Select, Input } from 'antd'
import { SchemaContext } from '@/utils/context'
import { getBlockElementByIndexes } from '@/editor/utils/tools'
import ChooseAnimation from './ChooseAnimation'
import deepcopy from 'deepcopy'
import animationMap from '@/editor/utils/animationMap'
import { CloseOutlined } from '@ant-design/icons'
import { keyframesType } from '@/editor/types'

const TabAnimation: FC = () => {
  const { state, dispatch } = useContext(SchemaContext)
  const { focusing, schema } = state

  const getFocusEle = () => {
    if (focusing) {
      if (focusing.blockIndex.length > 0) {
        const element = getBlockElementByIndexes(
          schema,
          focusing.containerIndex,
          focusing.blockIndex
        )
        if (element === 'notFound') {
          return null
        }
        return element
      } else {
        return schema.container[focusing.containerIndex]
      }
    }
    return null
  }
  const element = getFocusEle()

  const [currentAnimate, setCurrentAnimate] = useState<null | undefined | string>(
    element?.animation?.animationName
  )
  const [duration, setDuration] = useState<number>(
    element?.animation?.animationDuration ? parseInt(element.animation.animationDuration) : 2
  )
  const [iterationCount, setIterationCount] = useState<number | string>(
    element?.animation?.animationIterationCount
  )
  const [delay, setDelay] = useState<number>(
    element?.animation?.animationDelay ? parseInt(element.animation.animationDelay) : 0
  )
  const [timingFunction, setTimingFunction] = useState<string>(
    element?.animation?.animationTimingFunction ? element.animation.animationTimingFunction : 'ease'
  )
  const [disableCount, setDiableCount] = useState(
    typeof element?.animation?.animationIterationCount === 'string'
  )
  const onEnter = useCallback(
    (name: string) => {
      return () => {
        if (focusing) {
          dispatch({
            type: 'setAnimation',
            payload: {
              animationName: name,
              animationDuration: duration + 's',
              animationIterationCount: iterationCount,
              animationDelay: delay + 's'
            }
          })
        }
      }
    },
    [focusing, duration, iterationCount, delay]
  )
  const onLeave = useCallback(() => {
    if (focusing) {
      dispatch({
        type: 'setAnimation',
        payload: null
      })
    }
  }, [focusing])
  const onSetCurrentAnimate = useCallback((name: string) => {
    return () => {
      setCurrentAnimate(name)
    }
  }, [])
  const onSetDuration = (value: number | null) => {
    setDuration(value && value > 0 ? value : 1)
  }
  const onSetIterationCount = (value: number | string | null) => {
    setIterationCount(value ? value : 1)
  }
  const onSetDelay = (value: number | null) => {
    setDelay(value! > 0 ? value! : 0)
  }
  const onSetTimingFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimingFunction(e.target.value)
  }
  const onChangeSwitch = (checked: boolean) => {
    if (checked) {
      setIterationCount('infinite')
      setDiableCount(true)
    } else {
      setDiableCount(false)
      setIterationCount(1)
    }
  }
  const handleSubmit = () => {
    if (focusing) {
      const newSchema = deepcopy(state.schema)
      const newElement = getBlockElementByIndexes(
        newSchema,
        focusing.containerIndex,
        focusing.blockIndex
      )
      if (newElement === 'notFound') {
        dispatch({
          type: 'setFocusing',
          payload: null
        })
        return
      }
      newElement.animation.animationName = currentAnimate
      newElement.animation.animationDuration = duration + 's'
      newElement.animation.animationIterationCount = iterationCount
      newElement.animation.animationDelay = delay + 's'
      newElement.animation.animationTimingFunction = timingFunction ? timingFunction : 'ease'
      newElement.animation.keyframes = keyframes

      dispatch({
        type: 'setSchema',
        payload: newSchema
      })
      dispatch({
        type: 'pushQueue',
        payload: newSchema
      })
      message.success('成功')
    }
  }
  const onDeleteAnimate = () => {
    setCurrentAnimate(null)
    onLeave()
    if (currentAnimate === '自定义动效') {
      setKeyframeChecked(false)
    }
  }

  type editableKeyframesCss = 'opacity' | 'backgroundColor' | 'transform' | 'transformOrigin'

  const keyframeEffectOptions = [
    {
      value: 'opacity',
      label: '透明度'
    },
    {
      value: 'backgroundColor',
      label: '背景颜色'
    },
    {
      value: 'transform',
      label: 'transform'
    },
    {
      value: 'transformOrigin',
      label: 'transformOrigin'
    }
  ]

  const [percentageInputValue, setPercentageInputValue] = useState<string>('')
  const [keyframes, setKeyframes] = useState<keyframesType>(
    element?.animation?.keyframes
      ? element?.animation?.keyframes
      : {
          steps: []
        }
  )

  useEffect(() => {
    if (element) {
      if (element?.animation?.keyframes) setKeyframes(element.animation.keyframes)
      else {
        setKeyframes({
          steps: []
        })
      }
    }
  }, [element?.animation?.keyframes])

  const filterOptions = (choosenValue: string[]) => {
    return keyframeEffectOptions.filter((val) => {
      if (!choosenValue.includes(val.value)) {
        return val
      }
    })
  }

  const addStep = (percentNum: string) => {
    const percentNumReg = /^(0|[1-9][0-9]{0,1}|100)%$/
    if (!percentNumReg.test(percentNum)) {
      message.warning('请输入一个百分比正整数')
      return
    }
    for (let i = 0; i < keyframes.steps.length; i++) {
      if (keyframes.steps[i].percentNum === percentNum) {
        message.warning('关键帧重复')
        return
      }
    }
    const lastStep = keyframes.steps[keyframes.steps.length - 1]
      ? {
          width: keyframes.steps[keyframes.steps.length - 1].effectProperties.width,
          height: keyframes.steps[keyframes.steps.length - 1].effectProperties.height,
          left: keyframes.steps[keyframes.steps.length - 1].effectProperties.left,
          top: keyframes.steps[keyframes.steps.length - 1].effectProperties.top
        }
      : {
          width: element.position.width,
          height: element.position.height,
          left: element.position.left,
          top: element.position.top
        }

    const sequentialSteps = [
      ...keyframes.steps,
      {
        percentNum: percentNum,
        effectProperties: { ...lastStep }
      }
    ].sort((a, b) => {
      return Number(a.percentNum.replace('%', '')) - Number(b.percentNum.replace('%', ''))
    })
    setKeyframes({
      ...keyframes,
      steps: sequentialSteps
    })
  }

  const onChangeSelect = (ind: number) => {
    return (value: string) => {
      const newKeyframes = deepcopy(keyframes)
      newKeyframes.steps[ind].effectProperties[value as editableKeyframesCss] = ''
      setKeyframes(newKeyframes)
    }
  }
  const onDeleteStep = (index: number) => {
    return () => {
      const newKeyframes = deepcopy(keyframes)
      newKeyframes.steps.splice(index, 1)
      setKeyframes(newKeyframes)
      const newSchema = deepcopy(schema)
      if (focusing) {
        const newElement = getBlockElementByIndexes(
          newSchema,
          focusing.containerIndex,
          focusing.blockIndex
        )
        newElement.animation.keyframes = newKeyframes
        dispatch({
          type: 'setSchema',
          payload: newSchema
        })
        dispatch({
          type: 'pushQueue',
          payload: newSchema
        })
      }
    }
  }
  const [keyframeChecked, setKeyframeChecked] = useState(
    element?.animation?.animationName === '自定义动效'
  )
  const onChangeKeyframeSwitch = (checked: boolean) => {
    if (checked) {
      setCurrentAnimate('自定义动效')
      setKeyframeChecked(true)
    } else {
      setCurrentAnimate(null)
      setKeyframeChecked(false)
    }
  }
  return (
    <>
      {element ? (
        <div>
          {element.animation.disable ? (
            <div>不可编辑动效</div>
          ) : (
            <div>
              <div className="mb-4">
                <div>
                  <span className="mb-2 inline-block">当前动效：</span>
                  {currentAnimate ? (
                    <div
                      onMouseEnter={onEnter(currentAnimate)}
                      onMouseLeave={onLeave}
                      className="w-24 h-10 p-2 relative rounded text-center overflow-hidden flex items-center leading-tight justify-center bg-[#1677ff] hover:bg-[rgb(30,140,250)] text-white transition duration-300 cursor-pointer break-all"
                    >
                      {animationMap[currentAnimate as keyof typeof animationMap]
                        ? animationMap[currentAnimate as keyof typeof animationMap]
                        : currentAnimate}
                      <div
                        onClick={onDeleteAnimate}
                        className="w-3 h-3 absolute flex justify-center items-center right-1 top-1"
                      >
                        <CloseOutlined />
                      </div>
                    </div>
                  ) : (
                    <div className="w-24 h-10 p-2 relative rounded text-center overflow-hidden flex items-center leading-tight justify-center bg-gray-300 text-white transition duration-300 cursor-pointer break-all">
                      无动效
                    </div>
                  )}
                </div>
              </div>
              <div className="block mb-2">选择动效：</div>
              <ChooseAnimation
                onEnter={onEnter}
                onLeave={onLeave}
                onSetCurrentAnimate={onSetCurrentAnimate}
              />
              <div className="border-t border-b border-gray-200 py-4 my-4">
                <div className="block mb-2">
                  自定义动效: <Switch checked={keyframeChecked} onChange={onChangeKeyframeSwitch} />
                </div>
                {keyframes.steps.map((value, index) => {
                  return (
                    <div className="my-2 w-[300px] bg-gray-100 p-2 rounded-md" key={index}>
                      <div className="flex items-center">
                        <span className="mr-4">{value.percentNum}</span>
                        <Button size="small" type="primary" onClick={onDeleteStep(index)}>
                          删除
                        </Button>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span>新增属性：</span>
                        <Select
                          style={{ width: 160 }}
                          onSelect={onChangeSelect(index)}
                          options={filterOptions(Object.keys(value.effectProperties))}
                        />
                      </div>

                      {Object.entries(value.effectProperties).map((val, ind) => {
                        return (
                          <div key={ind} className="flex justify-between items-center mb-2">
                            <span>{val[0]}:</span>
                            <Input
                              className="w-[160px]"
                              value={val[1]}
                              onChange={(e) => {
                                const nweKeyframes = deepcopy(keyframes)
                                nweKeyframes.steps[index].effectProperties[
                                  val[0] as editableKeyframesCss
                                ] = e.target.value
                                setKeyframes(nweKeyframes)
                              }}
                            />
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
                <Input
                  className="w-[83px]"
                  value={percentageInputValue}
                  onChange={(e) => {
                    setPercentageInputValue(e.target.value)
                  }}
                />
                <Button
                  className="ml-3"
                  type="primary"
                  onClick={() => addStep(percentageInputValue)}
                >
                  新增关键帧
                </Button>
              </div>
              <div>
                <div className="block mb-4">
                  <div>执行时间:</div>
                  <InputNumber
                    value={duration}
                    onChange={onSetDuration}
                    addonAfter="秒"
                    style={{ width: 120 }}
                  />
                </div>
                <div className="block mb-4">
                  <div>动画延迟:</div>
                  <InputNumber
                    value={delay}
                    onChange={onSetDelay}
                    addonAfter="秒"
                    style={{ width: 120 }}
                  />
                </div>
                <div className="block mb-4">
                  <div>速度曲线:</div>
                  <Input
                    value={timingFunction}
                    onChange={onSetTimingFunction}
                    style={{ width: 120 }}
                  />
                </div>
                <div className="block mb-4">
                  <div>动画次数:</div>
                  <InputNumber
                    disabled={disableCount}
                    value={iterationCount}
                    onChange={onSetIterationCount}
                    style={{ width: 120 }}
                  />
                </div>
                <div className="block mb-4">
                  <div>循环播放:</div>
                  <Switch
                    defaultChecked={typeof element.animation.animationIterationCount === 'string'}
                    onChange={onChangeSwitch}
                  />
                </div>
                <Button type="primary" disabled={!focusing} onClick={handleSubmit}>
                  保存
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>无选中元素</div>
      )}
    </>
  )
}
export default TabAnimation
