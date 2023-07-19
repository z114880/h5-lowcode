import { Tabs } from 'antd'
import { FC } from 'react'
import Base from './MaterialIcon/Base'
import Customized from './MaterialIcon/Customized'
import styles from './index.module.scss'
import classnames from 'classnames'
import Main from './EditorPages/Main'
import Dialog from './EditorPages/Dialog'

const LeftSide: FC = () => {
  const items = [
    {
      label: '基础组件',
      key: '基础组件',
      children: <Base />
    },
    {
      label: '业务组件',
      key: '业务组件',
      children: <Customized />
    }
  ]
  const topItems = [
    {
      label: '页面',
      key: '页面',
      children: <Main />
    },
    {
      label: '弹窗',
      key: '弹窗',
      children: <Dialog />
    }
  ]
  return (
    <aside className={classnames('h-full w-[405px] flex flex-col', styles.leftSide)}>
      <div className={classnames('w-[405px] h-[200px]', styles.topTab)}>
        <Tabs type="card" defaultActiveKey="1" items={topItems} />
      </div>
      <div className="w-[405px] h-[39px] bg-[rgba(0,0,0,0.02)] border-b border-t border-[rgba(5, 5, 5, 0.06)] text-center leading-[39px] text-[14px]">
        组件
      </div>
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        style={{ height: '100%', width: '405px' }}
        items={items}
      />
    </aside>
  )
}

export default LeftSide
