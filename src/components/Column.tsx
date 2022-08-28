import type { Task } from '@/types/types'

import Card from './Card'
import Button from './common/Button'
import { Heading2 } from './common/Typography'

type ColumnProps = {
  index: number
  id: string
  title: string
  tasks: Task[] | []
}

const Column = ({ title, tasks, index }: ColumnProps) => {
  return (
    <article className="flex h-[500px] min-w-fit flex-col space-y-3 overflow-y-hidden rounded bg-white p-2 shadow dark:bg-slate-2">
      <div className="group flex items-center justify-between">
        <Heading2 text={title} />
        <button
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
      <div className="h-full  max-w-fit space-y-3 overflow-y-auto pb-3">
        {tasks.length > 0 &&
          tasks.map((t) => (
            <Card stacks={t.stacks} key={t.id} id={t.id} title={t.title} />
          ))}
        {/*  maintain width of column */}
        {tasks.length === 0 && (
          <article className="not-sr-only mr-2 w-[304px] space-y-2 rounded bg-gray-light-2 p-2 opacity-0 shadow dark:bg-slate-3">
            Just to maintain width of column
          </article>
        )}
      </div>
      {index === 0 && <Button click={() => {}} text="Create new task" />}
    </article>
  )
}

export default Column
