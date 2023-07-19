import { FC } from 'react'
import { RightOutlined } from '@ant-design/icons'
export type positionObj = {
  width: number
  height: number
  left: number
  top: number
}
const AnimationLine: FC<{ startObj: positionObj; endObj: positionObj; zIndex: number }> = (props) => {
  const { startObj, endObj, zIndex } = props
  //起点元素中心坐标
  const y_start = startObj.top + startObj.height / 2
  const x_start = startObj.left + startObj.width / 2

  //终点元素中心坐标
  const y_end = endObj.top + endObj.height / 2
  const x_end = endObj.left + endObj.width / 2

  //用勾股定律计算出斜边长度及其夹角（即连线的旋转角度）
  const lx = x_end - x_start
  const ly = y_end - y_start
  //计算连线长度
  const length = Math.sqrt(lx * lx + ly * ly)
  //弧度值转换为角度值
  const c = (360 * Math.atan2(ly, lx)) / (2 * Math.PI)

  //连线中心坐标
  const midX = (x_end + x_start) / 2
  const midY = (y_end + y_start) / 2
  const deg = c <= -90 ? 360 + c : c //负角转换为正角

  return (
    <>
      <div
        className="absolute h-px bg-blue-100"
        slot="content"
        style={{
          top: midY,
          left: midX - length / 2,
          width: length,
          transform: `rotate(${deg}deg)`,
          zIndex: zIndex
        }}
      />
      {Boolean(length) && (
        <RightOutlined
          className="absolute"
          slot="content"
          style={{
            fontSize: '11px',
            color: 'rgba(147, 197, 253, 1)',
            top: midY,
            left: midX,
            marginTop: '-5px',
            marginLeft: '-6px',
            zIndex: zIndex,
            transform: `rotate(${deg}deg)`
          }}
        />
      )}
    </>
  )
}
export default AnimationLine
