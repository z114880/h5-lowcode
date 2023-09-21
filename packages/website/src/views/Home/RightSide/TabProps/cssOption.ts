export default (key: string, t: BaseFunction): Record<string, any>[] => {
  const options = {
    fontWeight: [
      { label: '正常', value: 'normal' },
      { label: '粗体', value: 'bold' }
    ],
    textAlign: [
      { label: t('textAlign.left'), value: 'left' },
      { label: t('textAlign.center'), value: 'center' },
      { label: t('textAlign.right'), value: 'right' },
      { label: t('textAlign.justify'), value: 'justify' }
    ],
    textDecoration: [
      { label: '无', value: 'none' },
      { label: '中划线', value: 'line-through' },
      { label: '下划线', value: 'underline' }
    ],
    position: [
      { label: '相对定位', value: 'relative' },
      { label: '绝对定位', value: 'absolute' }
    ],
    display: [
      { label: 'block', value: 'block' },
      { label: 'flex', value: 'flex' }
    ],
    flexDirection: [
      { label: 'row', value: 'row' },
      { label: 'column', value: 'column' }
    ],
    justifyContent: [
      { label: 'center', value: 'center' },
      { label: 'space-between', value: 'space-between' },
      { label: 'space-around', value: 'space-around' },
      { label: 'space-evenly', value: 'space-evenly' },
      { label: 'start', value: 'start' },
      { label: 'end', value: 'end' }
    ],
    alignItems: [
      { label: 'center', value: 'center' },
      { label: 'flex-start', value: 'flex-start' },
      { label: 'flex-end', value: 'flex-end' },
      { label: 'stretch', value: 'stretch' }
    ]
  } as Record<string, any>
  return options[key]
}
