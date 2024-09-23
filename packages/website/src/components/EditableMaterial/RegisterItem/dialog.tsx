import { componentItem } from '../index'
import Dialog from '../Dialog'

const dialog: componentItem = {
  label: '自定义弹窗',
  key: 'dialog',
  icon: () => <></>,
  editor: (containerIndex: number) => (
    <Dialog key={containerIndex} containerIndex={containerIndex} />
  ),
  position: {
    position: 'fixed',
    width: 375,
    zIndex: 100
  },
  props: {
    style: {},
    attr: {}
  },
  event: { disable: true },
  animation: { disable: true },
  blocks: [
    {
      key: 'baseLayout',
      noDelete: true,
      position: {
        width: 300,
        height: 400,
        zIndex: 10
      },
      props: {
        style: {
          backgroundImage: '',
          backgroundColor: ''
        },
        attr: {}
      },
      event: { disable: true },
      animation: { disable: true },
      blocks: [
        {
          key: 'closeButton',
          position: {
            width: 35,
            height: 35,
            zIndex: 10,
            left: 255,
            top: 10
          },
          props: {
            style: {
              backgroundImage:
                'url(//huodong.caixin.com/market/activity/caixintong_3th/img/close_.png)',
              position: 'absolute'
            },
            attr: {}
          },
          event: { disable: true },
          animation: { disable: true }
        }
      ]
    }
  ]
}

export default dialog
