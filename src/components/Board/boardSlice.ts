/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import { board } from '@/data'
import type { RootState } from '@/store/strore'
import type { Board, Task } from '@/types/types'
import { findItemIndexById } from '@/utils/array'

import type { CardDragItem, CreateNewTask, MoveTask, UpdateTask } from './types'

export type BoardState = {
  boards: Board[]
  draggedItem: CardDragItem | null
}

const initialState: BoardState = {
  boards: board,
  draggedItem: null,
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createNewTask: (state, action: PayloadAction<CreateNewTask>) => {
      const { boardId, text } = action.payload
      const targetBoardIndex = findItemIndexById(state.boards, boardId)
      state.boards[targetBoardIndex]?.tasks.push({
        id: nanoid(),
        title: text,
        description: '',
        date: new Date().toLocaleDateString(),
        stacks: [],
      })
    },
    createNewBoard: (state, action: PayloadAction<string>) => {
      state.boards.push({
        id: nanoid(),
        title: action.payload,
        tasks: [],
      })
    },
    setDraggedItem: (state, action: PayloadAction<CardDragItem | null>) => {
      state.draggedItem = action.payload
    },
    moveTask: (state, action: PayloadAction<MoveTask>) => {
      const { draggedItemId, hoveredItemId, currentColId, targetColId } =
        action.payload

      const currentBoardIndex = findItemIndexById(state.boards, currentColId)
      const targetBoardIndex = findItemIndexById(state.boards, targetColId)

      const dragIndex = findItemIndexById(
        state.boards[currentBoardIndex]!.tasks,
        draggedItemId,
      )

      const hoverIndex = hoveredItemId
        ? findItemIndexById(
            state.boards[targetBoardIndex]!.tasks,
            hoveredItemId,
          )
        : 0
      const item = state.boards[currentBoardIndex]!.tasks[dragIndex] as Task

      // Remove the task from the current list
      state.boards[currentBoardIndex]!.tasks.splice(dragIndex, 1)

      // Add the task to the target list
      state.boards[targetBoardIndex]!.tasks.splice(hoverIndex, 0, item)
    },
    updateTask: (state, action: PayloadAction<UpdateTask>) => {
      const { columnId, date, description, id, stacks, title } = action.payload
      const currIndex = findItemIndexById(state.boards, columnId)
      const currBoard = state.boards[currIndex]
      const curTaskIndex = findItemIndexById(currBoard!.tasks, id)

      currBoard!.tasks[curTaskIndex] = {
        id,
        date,
        description,
        stacks,
        title,
      }
    },
  },
})
export const selectBoards = (state: RootState) => state.board
export const {
  createNewTask,
  createNewBoard,
  setDraggedItem,
  moveTask,
  updateTask,
} = boardSlice.actions
export default boardSlice.reducer
