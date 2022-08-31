import { useRef } from 'react'
import { useDrop } from 'react-dnd'

import useBoolean from '@/hooks/useBoolean'
import { useAppDispatch, useAppSelector } from '@/store/reduxHooks'
import type { Task } from '@/types/types'
import { mergeRefs } from '@/utils/mergeRefs'
import { throttle } from '@/utils/throttle'

import {
  createNewTask,
  deleteBoard,
  moveTask,
  selectBoards,
  setDraggedItem,
  updateBoardTitle,
} from './Board/boardSlice'
import Card from './Card'
import AppModal from './common/AppModal'
import Button from './common/Button'
import DeleteInfo from './common/DeleteInfo'
import Form from './common/Form'
import { Heading2, Heading3 } from './common/Typography'

type ColumnProps = {
  index: number
  id: string
  title: string
  tasks: Task[] | []
}

const Column = ({ title, tasks, index, id }: ColumnProps) => {
  const [value, { setFalse, setTrue }] = useBoolean(false)
  const [edit, { setFalse: setEditFalse, setTrue: setEditTrue }] =
    useBoolean(false)
  const [isDelete, { setTrue: setDeleteTrue, setFalse: setDeleteFalse }] =
    useBoolean(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const dropRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useAppDispatch()
  const { draggedItem } = useAppSelector(selectBoards)

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: throttle(() => {
      if (!draggedItem) {
        return null
      }
      if (!dropRef) {
        return null
      }
      if (draggedItem.type === 'CARD') {
        if (draggedItem.columnId === id) {
          return null
        }
        if (tasks.length) {
          return null
        }
        dispatch(
          moveTask({
            draggedItemId: draggedItem.id,
            hoveredItemId: null,
            currentColId: draggedItem.columnId,
            targetColId: id,
          }),
        )
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }))
      }
      return null
    }, 200),
  })
  drop(dropRef)

  const afterLeave = () => {
    if (ref.current) {
      ref.current.scrollTo({
        behavior: 'smooth',
        top: ref.current.scrollHeight,
        left: 0,
      })
    }
  }
  const submit = (text: string) => {
    dispatch(
      createNewTask({
        boardId: id,
        text,
      }),
    )
    setFalse()
  }
  const updateTitle = (text: string) => {
    dispatch(
      updateBoardTitle({
        id,
        text,
      }),
    )
    setEditFalse()
  }
  const deleteCol = () => {
    dispatch(deleteBoard({ id }))
    setDeleteFalse()
  }

  return (
    <>
      <article className="flex max-h-[500px] min-w-fit  flex-col space-y-3 self-start overflow-y-hidden rounded bg-white p-2 shadow dark:bg-slate-2">
        <div className="group flex items-center justify-between">
          <Heading2 text={title} />
          <div className="space-x-1">
            {index !== 0 && (
              <button
                onClick={setDeleteTrue}
                type="button"
                className="rounded-full bg-secondary p-1.5 text-gray-light-1 ring-primary-dark ring-offset-1
            transition-transform hover:scale-105
            focus:outline-none
            focus-visible:ring-1 dark:bg-secondary-dark dark:ring-primary-dark dark:ring-offset-slate-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                <p className="sr-only">Delete task</p>
              </button>
            )}
            <button
              onClick={setEditTrue}
              type="button"
              className="rounded-full bg-primary-dark
            p-1.5 text-gray-light-1 ring-secondary-dark ring-offset-1 transition-transform
              hover:scale-105 focus:outline-none
              focus-visible:ring-1 dark:bg-primary-dark dark:ring-secondary-dark dark:ring-offset-slate-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
              <p className="sr-only">Edit Column title</p>
            </button>
          </div>
        </div>
        <div
          ref={mergeRefs(ref, dropRef)}
          className="max-h-[480px] max-w-fit space-y-3 self-start overflow-y-auto overflow-x-hidden pb-3"
        >
          {tasks.length > 0 &&
            tasks.map((t) => <Card key={t.id} columnId={id} task={t} />)}
          {/*  maintain width of column */}
          {tasks.length === 0 && (
            <div className="not-sr-only mr-2 w-[304px] bg-gray-light-2 p-0 opacity-0 shadow dark:bg-slate-3" />
          )}
        </div>
        {index === 0 && <Button click={setTrue} text="Create new task" />}
      </article>
      <AppModal value={value} setFalse={setFalse} fn={afterLeave}>
        <Heading3 text="Create new task" />
        <Form
          submit={submit}
          btnText="add new task"
          placeholder="your new task ..."
        />
      </AppModal>
      <AppModal value={edit} setFalse={setEditFalse}>
        <Heading3 text="Edit board title" />
        <Form
          icon={false}
          submit={updateTitle}
          title={title}
          btnText="Update title"
          placeholder="board title ..."
        />
      </AppModal>
      <AppModal setFalse={setDeleteFalse} value={isDelete}>
        <DeleteInfo title={title} deleteFn={deleteCol} close={setDeleteFalse} />
      </AppModal>
    </>
  )
}

export default Column
