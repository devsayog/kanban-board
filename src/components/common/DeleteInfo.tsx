import Button from './Button'
import { Heading3, Paragraph } from './Typography'

type DeleteProps = {
  title: string
  deleteFn: () => void
  close: () => void
  task?: boolean
}
const DeleteInfo = ({ title, close, deleteFn, task }: DeleteProps) => {
  return (
    <>
      <p className="text-xl text-secondary">Delete</p>
      <hr className="mt-1 text-gray-light-3 dark:text-slate-1" />
      <div className="flex flex-wrap items-center space-x-2">
        <Paragraph text="You are about to delete" />
        <Heading3 text={title} />
        <Paragraph text={task ? 'task' : 'column'} />
      </div>
      <Paragraph
        size="sm"
        className="text-secondary/90"
        text="The following operation will never be undone."
      />
      <div className="mt-4 flex justify-end">
        <Button icon={false} text="Delete" click={deleteFn} />
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
