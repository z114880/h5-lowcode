import React, { useEffect, useRef } from 'react'
import Ruler from '@/utils/Ruler'

export default function useRuler(EditorRef: React.MutableRefObject<HTMLDivElement | null>) {
  const columnRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (EditorRef.current && columnRef.current) {
      EditorRef.current.onscroll = () => {
        columnRef.current!.scrollTop = EditorRef.current!.scrollTop
      }
    }
  }, [EditorRef.current])
  useEffect(() => {
    const rowRulerDom = document.getElementsByClassName('rowRuler')[0]
    const columnRulerDom = document.getElementsByClassName('columnRuler')[0]
    if (rowRulerDom.innerHTML === '') {
      const row = Ruler.initRow({
        width: 375,
        canvasWidth: 394,
        height: 14,
        mark: 187,
        markColor: '#EF4444',
        showLastNum: true
      })
      rowRulerDom.appendChild(row)
    }
    if (columnRulerDom.innerHTML === '') {
      const column = Ruler.initColumn({
        height: 10000,
        width: 20,
        showLastNum: false
      })
      columnRulerDom.appendChild(column)
    }
  }, [])
  return { columnRef }
}
