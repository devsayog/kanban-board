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
import IconButton from './common/IconButton'
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
              <IconButton
                btnType="DELETE"
                click={setDeleteTrue}
                srText={`delete ${title} column`}
              />
            )}
            <IconButton
              btnType="EDIT"
              click={setEditTrue}
              srText={`edit ${title} column`}
            />
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
