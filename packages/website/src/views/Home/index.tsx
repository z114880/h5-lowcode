import { FC, useContext, useEffect, useLayoutEffect } from 'react'
import { SchemaContext } from '@/utils/context'
import Header from './Header'
import LeftSide from './LeftSide'
import Editor from '@/editor/Editor'
import RightSide from './RightSide'
import { broadCastChannel, dialogReg } from '@/utils/tools'
import { containerType } from '@/editor/types'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Menu, Item } from 'react-contexify'
import useHandleDelete from '@/editor/hooks/useHandleDelete'
import useHandleZIndex from '@/editor/hooks/useHandleZIndex'
import { useTranslation } from 'react-i18next'
const MENU_ID = 'rightPannel'

const Home: FC = () => {
  const { state, dispatch } = useContext(SchemaContext)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { schema, currentEditor, showLine, focusing } = state
  const devideDialogContainer = () => {
    const dialogs = schema.container.map((val) => {
      if (dialogReg.test(val.key)) {
        return val
      }
      return null
    })
    const eachDialogArr: Array<Array<containerType | null>> = []
    dialogs.forEach((val, ind) => {
      const arr = new Array(ind).fill(null)
      arr[ind] = val
      eachDialogArr.push(arr)
    })
    return eachDialogArr
  }
  const devideHomeContainer = () => {
    const containerArr = schema.container.map((val) => {
      if (!dialogReg.test(val.key)) {
        return val
      }
      return null
    })
    return containerArr
  }
  const DialogArr = devideDialogContainer()
  const HomeArr = devideHomeContainer()

  const { onDeleteWithoutFocusing, enableDelete } = useHandleDelete(schema, dispatch, focusing)
  const { onAddZIndexWithouFocusing, onMinusZIndexWithoutFocuing, enableHandleZIndex } =
    useHandleZIndex(schema, dispatch, focusing)

  const handleItemClick = ({ id, props }: any) => {
    switch (id) {
      case 'delete':
        onDeleteWithoutFocusing(t, props.containerIndex, props.blockIndex)
        break
      case 'addZIndex':
        onAddZIndexWithouFocusing(t, props.containerIndex, props.blockIndex)
        break
      case 'minusZIndex':
        onMinusZIndexWithoutFocuing(t, props.containerIndex, props.blockIndex)
        break
    }
  }

  const isHiddenDelete = ({ props }: any) => {
    return enableDelete(props.containerIndex, props.blockIndex)
  }
  const isHiddenZIndex = ({ props }: any) => {
    return enableHandleZIndex(props.containerIndex, props.blockIndex)
  }

  useLayoutEffect(() => {
    window.isInEditor = true
    window.viteEnv = import.meta.env.VITE_USER_NODE_ENV
  }, [])

  useEffect(() => {
    const initialCastChannel = new BroadcastChannel('Init')
    initialCastChannel.onmessage = () => {
      broadCastChannel.postMessage(state.schema)
    }
  }, [state.schema])

  useEffect(() => {
    if (!localStorage.getItem('name') || !localStorage.getItem('avatar')) {
      navigate('/login')
      return
    }
  }, [])

  return (
    <>
      <Header />
      <section className="w-full h-[calc(100vh-80px)] flex flex-row justify-between overflow-y-hidden relative">
        <LeftSide />
        <section id="middleSection" className="flex-1 h-full pl-[8.5rem] pt-8 bg-gray-100 flex">
          {currentEditor.current === 'main' && <Editor pageSchema={HomeArr} />}
          {currentEditor.current === 'dialog' &&
            DialogArr.map((val, ind) => {
              if (
                val.filter((val) => {
                  return val !== null
                }).length > 0 &&
                currentEditor.containerIndex === ind
              )
                return <Editor key={ind} pageSchema={val} />
            })}

          {showLine ? (
            <Button
              onClick={() => dispatch({ type: 'setShowLine', payload: false })}
              type="primary"
              className="ml-4"
            >
              {t('leftPannel.showGuideline')}
            </Button>
          ) : (
            <Button
              onClick={() => dispatch({ type: 'setShowLine', payload: true })}
              type="primary"
              className="ml-4"
            >
              {t('leftPannel.hideGuideline')}
            </Button>
          )}
        </section>
        <RightSide />
      </section>
      <Menu id={MENU_ID} animation={false}>
        <Item id="delete" disabled={isHiddenDelete} onClick={handleItemClick}>
          {t('header.delete')}
        </Item>
        <Item id="addZIndex" disabled={isHiddenZIndex} onClick={handleItemClick}>
          {t('header.increaseZIndex')}
        </Item>
        <Item id="minusZIndex" disabled={isHiddenZIndex} onClick={handleItemClick}>
          {t('header.decreaseZIndex')}
        </Item>
      </Menu>
    </>
  )
}

export default Home
