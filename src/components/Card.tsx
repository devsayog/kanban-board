import { useRef } from 'react'
import { useDrop } from 'react-dnd'

import useBoolean from '@/hooks/useBoolean'
import useDragItem from '@/hooks/useDragItem'
import { useAppDispatch, useAppSelector } from '@/store/reduxHooks'
import type { Task } from '@/types/types'
import { throttle } from '@/utils/throttle'

import {
  deleteTask,
  moveTask,
  selectBoards,
  setDraggedItem,
} from './Board/boardSlice'
import CardInfo from './CardInfo'
import AppModal from './common/AppModal'
import Chips from './common/Chips'
import DeleteInfo from './common/DeleteInfo'
import IconButton from './common/IconButton'
import { Paragraph } from './common/Typography'

type CardProps = {
  task: Task
  columnId: string
  isPreview?: boolean
}
const Card = ({ isPreview, columnId, task }: CardProps) => {
  const { date, description, id, title, stacks } = task
  const [value, { setTrue, setFalse }] = useBoolean(false)
  const [isDelete, { setTrue: setDeleteTrue, setFalse: setDeleteFalse }] =
    useBoolean(false)
  const { draggedItem } = useAppSelector(selectBoards)
  const ref = useRef<HTMLElement>(null)
  const dispatch = useAppDispatch()
  const { drag } = useDragItem({
    type: 'CARD',
    id,
    title,
    date,
    columnId,
    stacks: stacks || [],
    description,
  })

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: throttle(() => {
      if (!ref.current) {
        return null
      }
      if (!draggedItem) {
        return null
      }
      if (draggedItem.type !== 'CARD') {
        return null
      }
      if (draggedItem.id === id) {
        return null
      }
      dispatch(
        moveTask({
          draggedItemId: draggedItem.id,
          hoveredItemId: id,
          currentColId: draggedItem.columnId,
          targetColId: columnId,
        }),
      )
      dispatch(setDraggedItem({ ...draggedItem, columnId }))
      return null
    }, 100),
  })
  drag(drop(ref))
  const hidden = () => {
    return Boolean(
      !isPreview &&
        draggedItem &&
        draggedItem.type === 'CARD' &&
        draggedItem.id === id,
    )
  }
  const deleteCard = () => {
    dispatch(
      deleteTask({
        id,
        columnId,
      }),
    )
    setDeleteFalse()
  }
  return (
    <>
      <article
        ref={ref}
        className={`mr-2 w-[304px] space-y-2 rounded bg-gray-light-2 p-2 shadow dark:bg-slate-3 ${
          hidden() ? 'opacity-0' : 'opacity-100'
        }
      `}
      >
        <div className="flex flex-wrap">
          {stacks &&
            stacks.length > 0 &&
            stacks.map((s) => <Chips text={s.text} key={s.id} />)}
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Paragraph
              className="font-light capitalize tracking-wide"
              text={title}
            />
            <div className="flex items-center space-x-2">
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>

              <Paragraph size="sm" text={date} />
            </div>
          </div>
          <div className="flex space-x-1">
            <IconButton
              btnType="DELETE"
              click={setDeleteTrue}
              srText={`delete ${title} task`}
            />
            <IconButton
              btnType="EDIT"
              click={setTrue}
              srText={`edit ${title} task`}
            />
          </div>
        </div>
      </article>
      <AppModal setFalse={setFalse} value={value}>
        <CardInfo task={task} columnId={columnId} close={setFalse} />
      </AppModal>
      <AppModal setFalse={setDeleteFalse} value={isDelete}>
        <DeleteInfo
          title={title}
          task
          deleteFn={deleteCard}
          close={setDeleteFalse}
        />
      </AppModal>
    </>
  )
}

export default Card
