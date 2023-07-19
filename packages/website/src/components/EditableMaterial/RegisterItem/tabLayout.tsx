import MaterialItem from '../MaterialItem'
import TabLayout from '../TabLayout'
import tabLayoutIcon from '@/assets/images/materialIcon/tabLayout.svg'
import { componentItem } from '../index'

const tabLayout: componentItem = {
  label: 'Tab容器',
  key: 'tabLayout',
  icon: (borderB?: boolean) => (
    <MaterialItem borderB={borderB} icon={tabLayoutIcon} label="Tab容器" name="tabLayout" />
  ),
  editor: (containerIndex: number) => (
    <TabLayout blockIndex={[]} containerIndex={containerIndex} key={containerIndex} bottom={true} />
  ),
  position: {
    position: 'relative',
    height: 600,
    zIndex: 10
  },
  props: {
    style: {},
    attr: { activedBackgroundColor: '', deactivedBackgroundColor: '' }
  },
  event: { disable: true },
  animation: { disable: true },
  tabAttr: {
    active: 1
  },
  blocks: [
    {
      key: 'tabHeader',
      position: {
        height: 50
      },
      props: {
        style: {},
        attr: {}
      },
      event: { disable: true },
      animation: { disable: true },
      blocks: [
        {
          key: 'tabHeaderItem',
          position: {
            width: 150
          },
          props: {
            style: {},
            attr: {}
          },
          event: { disable: true },
          animation: { disable: true },
          blocks: [
            {
              key: 'tabHeaderItemActive',
              position: {},
              props: {
                style: {},
                attr: {}
              },
              event: { disable: true },
              animation: { disable: true },
              blocks: []
            },
            {
              key: 'tabHeaderItemDeActive',
              position: {},
              props: {
                style: {},
                attr: {}
              },
              event: { disable: true },
              animation: { disable: true },
              blocks: []
            }
          ]
        },
        {
          key: 'tabHeaderItem',
          position: {
            width: 150
          },
          props: {
            style: {},
            attr: {}
          },
          event: { disable: true },
          animation: { disable: true },
          blocks: [
            {
              key: 'tabHeaderItemActive',
              position: {},
              props: {
                style: {},
                attr: {}
              },
              event: { disable: true },
              animation: { disable: true },
              blocks: []
            },
            {
              key: 'tabHeaderItemDeActive',
              position: {},
              props: {
                style: {},
                attr: {}
              },
              event: { disable: true },
              animation: { disable: true },
              blocks: []
            }
          ]
        },
        {
          key: 'tabHeaderItem',
          position: {
            width: 150
          },
          props: {
            style: {},
            attr: {}
          },
          event: { disable: true },
          animation: { disable: true },
          blocks: [
            {
              key: 'tabHeaderItemActive',
              position: {},
              props: {
                style: {},
                attr: {}
              },
              event: { disable: true },
              animation: { disable: true },
              blocks: []
            },
            {
              key: 'tabHeaderItemDeActive',
              position: {},
              props: {
                style: {},
                attr: {}
              },
              event: { disable: true },
              animation: { disable: true },
              blocks: []
            }
          ]
        }
      ]
    },
    {
      key: 'tabContent',
      position: {},
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
            height: 520,
            zIndex: 10
          },
          props: {
            style: {
              backgroundImage: '',
              backgroundColor: ''
            },
            attr: {
              hidden: {
                type: 'disabled',
                value: 'true'
              }
            }
          },
          event: { disable: true },
          animation: { disable: true },
          blocks: []
        },
        {
          key: 'baseLayout',
          noDelete: true,
          position: {
            height: 520,
            zIndex: 10
          },
          props: {
            style: {
              backgroundImage: '',
              backgroundColor: ''
            },
            attr: {
              hidden: {
                type: 'disabled',
                value: 'true'
              }
            }
          },
          event: { disable: true },
          animation: { disable: true },
          blocks: []
        },
        {
          key: 'baseLayout',
          noDelete: true,
          position: {
            height: 520,
            zIndex: 10
          },
          props: {
            style: {
              backgroundImage: '',
              backgroundColor: ''
            },
            attr: {
              hidden: {
                type: 'disabled',
                value: 'true'
              }
            }
          },
          event: { disable: true },
          animation: { disable: true },
          blocks: []
        }
      ]
    }
  ]
}

export default tabLayout
