import { componentItem } from '../index'
import Dialog from '../Dialog'

const prizeDialog: componentItem = {
  label: '我的奖品弹窗',
  key: 'prizeDialog',
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
        height: 400
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
          key: 'prizeBox',
          noDelete: true,
          position: {
            width: 100,
            height: 200,
            left: 100,
            top: 100,
            zIndex: 10
          },
          props: {
            style: { fontSize: 14, color: '#000', position: 'absolute' },
            attr: { 'activity-id': '' }
          },
          event: { disable: true },
          animation: { disable: true }
        },
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

export default prizeDialog
