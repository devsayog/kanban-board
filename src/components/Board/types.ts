import type { Task } from '@/types/types'

export type CreateNewTask = {
  boardId: string
  text: string
}
export interface CardDragItem extends Task {
  type: 'CARD'
  columnId: string
}
export type MoveTask = {
  draggedItemId: string
  hoveredItemId: string | null
  currentColId: string
  targetColId: string
}
