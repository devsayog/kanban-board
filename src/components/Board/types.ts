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

export interface UpdateTask extends Task {
  columnId: string
}
export type DeleteTask = {
  id: string
  columnId: string
}
export type UpdateBoardTitle = {
  id: string
  text: string
}
