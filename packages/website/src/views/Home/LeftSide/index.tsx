import { Tabs } from 'antd'
import { FC } from 'react'
import Base from './MaterialIcon/Base'
import Customized from './MaterialIcon/Customized'
import styles from './index.module.scss'
import classnames from 'classnames'
import Main from './EditorPages/Main'
import Dialog from './EditorPages/Dialog'
import { useTranslation } from 'react-i18next'
const LeftSide: FC = () => {
  const { t } = useTranslation()
  const items = [
    {
      label: <div className="w-[56px]">{t('leftPannel.baseComponent')}</div>,
      key: 'baseComponent',
      children: <Base />
    },
    {
      label: <div className="w-[56px]">{t('leftPannel.customizedComponent')}</div>,
      key: 'customizedComponent',
      children: <Customized />
    }
  ]
  const topItems = [
    {
      label: t('leftPannel.page'),
      key: 'page',
      children: <Main />
    },
    {
      label: t('leftPannel.modal'),
      key: 'modal',
      children: <Dialog />
    }
  ]
  return (
    <aside className={classnames('h-full w-[405px] flex flex-col', styles.leftSide)}>
      <div className={classnames('w-[405px] h-[200px]', styles.topTab)}>
        <Tabs type="card" defaultActiveKey="1" items={topItems} />
      </div>
      <div className="w-[405px] h-[39px] bg-[rgba(0,0,0,0.02)] border-b border-t border-[rgba(5, 5, 5, 0.06)] text-center leading-[39px] text-[14px]">
        {t('leftPannel.component')}
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
