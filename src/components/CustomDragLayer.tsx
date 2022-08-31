import { useDragLayer } from 'react-dnd'

import { useAppSelector } from '@/store/reduxHooks'

import { selectBoards } from './Board/boardSlice'
import Card from './Card'

const CustomDragLayer = () => {
  const { draggedItem } = useAppSelector(selectBoards)
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }))
  return draggedItem && currentOffset ? (
    <div className="pointer-events-none fixed left-0 top-0 z-50 h-full">
      <div
        style={{
          transform: `translate(${currentOffset.x}px,${currentOffset.y}px)`,
          rotate: '2deg',
          // scale: '1.1',
        }}
      >
        {draggedItem.type === 'CARD' && (
          <Card
            stacks={draggedItem.stacks}
            key={draggedItem.id}
            id={draggedItem.id}
            title={draggedItem.title}
            columnId={draggedItem.columnId}
            date={draggedItem.date}
            description={draggedItem.description}
            isPreview
          />
        )}
      </div>
    </div>
  ) : null
}

export default CustomDragLayer
