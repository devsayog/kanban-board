import { useRef } from 'react'
import { useDrop } from 'react-dnd'

// import { useDrop } from 'react-dnd'
import useDragItem from '@/hooks/useDragItem'
import { useAppDispatch, useAppSelector } from '@/store/reduxHooks'
import type { Stack } from '@/types/types'
import { throttle } from '@/utils/throttle'

import { moveTask, selectBoards, setDraggedItem } from './Board/boardSlice'
import Chips from './common/Chips'
import { Paragraph } from './common/Typography'

type CardProps = {
  title: string
  id: string
  date: string
  columnId: string
  description: string
  stacks: Stack[] | undefined | []
  isPreview?: boolean
}
const Card = ({
  isPreview,
  title,
  stacks,
  id,
  date,
  columnId,
  description,
}: CardProps) => {
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

  const [, drop] = useDrop(
    () => ({
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
        return dispatch(setDraggedItem({ ...draggedItem, columnId }))
      }, 200),
    }),
    [draggedItem],
  )
  drag(drop(ref))
  const hidden = () => {
    return Boolean(
      !isPreview &&
        draggedItem &&
        draggedItem.type === 'CARD' &&
        draggedItem.id === id,
    )
  }
  return (
    <article
      ref={ref}
      className={`mr-2 w-[304px] space-y-2 rounded bg-gray-light-2 p-2 shadow dark:bg-slate-3 ${
        hidden() ? 'opacity-0' : 'opacity-100'
      }
      `}
      // style={{
      //   opacity: hidden() ? 0 : 1,
      // }}
    >
      <div className="flex flex-wrap">
        {stacks &&
          stacks.length > 0 &&
          stacks.map((s) => <Chips text={s.text} key={s.id} />)}
      </div>
      <div className="flex items-center justify-between">
        <Paragraph
          className="font-light capitalize tracking-wide"
          text={title}
        />
        <div className="flex space-x-1">
          <button
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
          <button
            type="button"
            className="rounded-full bg-primary-dark p-1.5 text-gray-light-1 ring-secondary-dark
            ring-offset-1 transition-transform
            hover:scale-105 focus:outline-none focus-visible:ring-1 dark:bg-primary-dark dark:ring-secondary-dark dark:ring-offset-slate-3"
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
            <p className="sr-only">Edit task</p>
          </button>
        </div>
      </div>
    </article>
  )
}

export default Card
