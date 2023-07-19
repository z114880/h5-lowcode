import { componentItem } from '../index'
import Dialog from '../Dialog'

const realGoodsDialog: componentItem = {
  label: '实物中奖弹窗',
  key: 'realGoodsDialog',
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
          key: 'text',
          position: {
            width: 200,
            height: 40,
            left: 50,
            top: 50,
            zIndex: 10
          },
          props: {
            style: {
              fontSize: '16',
              color: '#000',
              lineHeight: '18',
              textAlign: 'center',
              position: 'absolute'
            },
            attr: { text: '测试奖品九阳豆浆机' }
          },
          event: { disable: true },
          animation: { disable: true }
        },
        {
          key: 'input',
          position: {
            width: 200,
            height: 40,
            zIndex: 10,
            left: 50,
            top: 100
          },
          props: {
            style: {
              fontSize: '16',
              color: '#000',
              backgroundColor: 'rgb(229,229,229)',
              position: 'absolute'
            },
            attr: {
              placeholder: '请输入',
              name: {
                type: 'disabled',
                value: 'name'
              }
            }
          },
          event: { disable: true },
          animation: { disable: true }
        },
        {
          key: 'input',
          position: {
            width: 200,
            height: 40,
            zIndex: 10,
            left: 50,
            top: 200
          },
          props: {
            style: {
              fontSize: '16',
              color: '#000',
              backgroundColor: 'rgb(229,229,229)',
              position: 'absolute'
            },
            attr: {
              placeholder: '请输入',
              name: {
                type: 'disabled',
                value: 'telephone'
              }
            }
          },
          event: { disable: true },
          animation: { disable: true }
        },
        {
          key: 'input',
          position: {
            width: 200,
            height: 40,
            zIndex: 10,
            left: 50,
            top: 150
          },
          props: {
            style: {
              fontSize: '16',
              color: '#000',
              backgroundColor: 'rgb(229,229,229)',
              position: 'absolute'
            },
            attr: {
              placeholder: '请输入',
              name: {
                type: 'disabled',
                value: 'address'
              }
            }
          },
          event: { disable: true },
          animation: { disable: true }
        },
        {
          key: 'submitButton',
          position: {
            width: 80,
            height: 40,
            zIndex: 10,
            left: 110,
            top: 300
          },
          props: {
            style: {
              backgroundImage: '',
              backgroundColor: '',
              fontSize: '16',
              color: '#000',
              lineHeight: '18',
              textAlign: 'center',
              textDecoration: 'none',
              borderRadius: '0',
              position: 'absolute'
            },
            attr: {
              text: ''
            }
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

export default realGoodsDialog
