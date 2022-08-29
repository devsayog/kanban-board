import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import { board } from '@/data'
import type { RootState } from '@/store/strore'
import type { Board } from '@/types/types'
import { findItemByIndexId } from '@/utils/array'

import type { CreateNewTask } from './types'

export type BoardState = {
  boards: Board[]
}

const initialState: BoardState = {
  boards: board,
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createNewTask: (state, action: PayloadAction<CreateNewTask>) => {
      const { boardId, text } = action.payload
      const targetBoardIndex = findItemByIndexId(state.boards, boardId)
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
  },
})
export const selectBoards = (state: RootState) => state.board
export const { createNewTask, createNewBoard } = boardSlice.actions
export default boardSlice.reducer
