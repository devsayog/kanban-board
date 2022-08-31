import { nanoid } from 'nanoid'
import type { ChangeEvent, FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import { useAppDispatch } from '@/store/reduxHooks'
import type { Stack, Task } from '@/types/types'

import { updateTask } from './Board/boardSlice'
import Button from './common/Button'
import Chips from './common/Chips'
import { Heading2, Paragraph } from './common/Typography'

type CardInfoProps = {
  task: Task
  columnId: string
  close: () => void
}
const CardInfo = ({ task, columnId, close }: CardInfoProps) => {
  const { date, description, id, title, stacks } = task
  const dispatch = useAppDispatch()
  const [values, setValues] = useState<{
    description: string
    title: string
    stacks: Stack[]
  }>({
    description: '',
    title: '',
    stacks: [],
  })
  const [error, setError] = useState('')

  const ref = useRef<HTMLInputElement | null>(null)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }
  const stacksSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!ref.current) {
      return null
    }
    const { value } = ref.current
    if (!value.trim()) {
      return null
    }
    const newStack = {
      id: nanoid(),
      text: value,
    }
    setValues({
      ...values,
      stacks: [...values.stacks, newStack],
    })
    ref.current.value = ''
    return null
  }
  const deleteTask = (taskId: string) => {
    return setValues({
      ...values,
      stacks: values.stacks.filter((s) => s.id !== taskId),
    })
  }

  const update = () => {
    if (!values.title.trim()) {
      return setError('Please provide valid value')
    }
    dispatch(
      updateTask({
        columnId,
        date,
        description: values.description,
        id,
        stacks: values.stacks,
        title: values.title,
      }),
    )
    return close()
  }

  useEffect(() => {
    setValues({
      description,
      title,
      stacks,
    })
  }, [description, stacks, title])

  const styles = {
    labelStyles: 'text-sm font-bold capitalize md:text-base xl:text-lg',
    inputStyles:
      'mt-1 w-full rounded border-2 text-gray-dark-1 focus:outline-none focus-visible:ring-1 dark:ring-primary-dark',
  }

  return (
    <>
      <div className="">
        <Heading2 text="Edit Task" />
        <hr className="mt-1 text-gray-light-3 dark:text-slate-1" />
        <label className={styles.labelStyles} htmlFor="title">
          title
        </label>
        <input
          onChange={handleChange}
          id="title"
          name="title"
          value={values.title}
          type="text"
          className={styles.inputStyles}
          placeholder="Tilte..."
        />
        {error && (
          <Paragraph
            text={error}
            size="sm"
            className="text-secondary-dark dark:text-secondary"
          />
        )}
        <div className="my-3">
          <label className={styles.labelStyles} htmlFor="stacks">
            Stacks
          </label>
          <div className="my-2 flex flex-wrap">
            {values.stacks.map((s) => (
              <Chips
                text={s.text}
                key={s.id}
                btn
                close={() => deleteTask(s.id)}
              />
            ))}
          </div>
          <form onSubmit={stacksSubmit} className="flex">
            <input
              ref={ref}
              id="stacks"
              type="text"
              className={styles.inputStyles}
              placeholder="Tech used ..."
            />
            <button
              type="submit"
              className="ml-2 rounded bg-primary px-3 transition-all hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary"
            >
              Add
            </button>
          </form>
        </div>
        <label className={styles.labelStyles} htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          rows={6}
          onChange={handleChange}
          value={values.description}
          name="description"
          className={styles.inputStyles}
        />
        <div className="mt-1 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          <Paragraph text={date} />
        </div>
        <div className="mt-2 flex">
          <Button text="Submit" click={update} />
          <button
            onClick={close}
            type="button"
            className="ml-2 rounded bg-primary px-3 transition-all hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}

export default CardInfo
