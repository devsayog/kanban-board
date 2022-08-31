import { useAppDispatch } from '@/store/reduxHooks'

import { deleteTask } from '../Board/boardSlice'
import Button from './Button'
import { Heading3, Paragraph } from './Typography'

type DeleteProps = {
  title: string
  close: () => void
  id: string
  columnId: string
}
const DeleteInfo = ({ title, close, id, columnId }: DeleteProps) => {
  const dispatch = useAppDispatch()
  return (
    <>
      <p className="text-xl text-secondary">Delete</p>
      <hr className="mt-1 text-gray-light-3 dark:text-slate-1" />
      <div className="flex items-center space-x-1">
        <Paragraph text="You are about to delete" />
        <Heading3 text={title} />
      </div>
      <Paragraph
        size="sm"
        className="text-secondary/90"
        text="The following operation will never be undone."
      />
      <div className="mt-4 flex justify-end">
        <Button
          icon={false}
          text="Delete"
          click={() => {
            dispatch(
              deleteTask({
                id,
                columnId,
              }),
            )
            close()
          }}
        />
        <button
          onClick={close}
          type="button"
          className="ml-2 rounded bg-primary px-3 transition-all hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary"
        >
          Cancel
        </button>
      </div>
    </>
  )
}

export default DeleteInfo
