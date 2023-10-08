import { FC, useContext } from 'react'
import { SchemaContext } from '@/utils/context'
import { useTranslation } from 'react-i18next'
const EditorPages: FC = () => {
  const { state, dispatch } = useContext(SchemaContext)
  const { t } = useTranslation()
  const setCurrentHome = () => {
    dispatch({
      type: 'setCurrentEditor',
      payload: {
        current: 'main'
      }
    })
  }
  return (
    <div className="h-[160px] overflow-y-scroll">
      <div
        onClick={setCurrentHome}
        className="cursor-pointer h-8 leading-8 pl-3 hover:bg-gray-100 text-gray-600 pl-7"
        style={{
          background: state.currentEditor.current === 'main' ? 'rgb(219, 234, 254)' : ''
        }}
      >
        {t('leftPannel.mainPage')}
      </div>
    </div>
  )
}
export default EditorPages
