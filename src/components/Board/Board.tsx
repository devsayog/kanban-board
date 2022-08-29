import useBoolean from '@/hooks/useBoolean'
import { useAppDispatch, useAppSelector } from '@/store/reduxHooks'

import Column from '../Column'
import AppModal from '../common/AppModal'
import Button from '../common/Button'
import Form from '../common/Form'
import { Heading3 } from '../common/Typography'
import { createNewBoard, selectBoards } from './boardSlice'

const Board = () => {
  const [value, { setFalse, setTrue }] = useBoolean(false)
  const { boards } = useAppSelector(selectBoards)
  const dispatch = useAppDispatch()

  const submit = (text: string) => {
    dispatch(createNewBoard(text))
    setFalse()
  }
  return (
    <>
      <section className="mt-4 flex w-full space-x-6 overflow-x-auto pb-4">
        {boards.map((b, i) => (
          <Column
            index={i}
            key={b.id}
            id={b.id}
            title={b.title}
            tasks={b.tasks}
          />
        ))}
        <Button click={setTrue} text="create new board" />
      </section>
      <AppModal value={value} setFalse={setFalse}>
        <Heading3 text="Create new board" />
        <Form
          submit={submit}
          btnText="add new board"
          placeholder="your new board ..."
        />
      </AppModal>
    </>
  )
}

export default Board
