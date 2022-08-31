import { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { setDraggedItem } from '@/components/Board/boardSlice'
import type { CardDragItem } from '@/components/Board/types'
import { useAppDispatch } from '@/store/reduxHooks'

const useDragItem = (item: CardDragItem) => {
  const dispatch = useAppDispatch()
  const [{ isDragging }, drag, preview] = useDrag({
    type: item.type,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => {
      dispatch(setDraggedItem(item))
      return item
    },
    end: () => {
      dispatch(setDraggedItem(null))
    },
  })
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])
  return { isDragging, drag }
}
export default useDragItem
