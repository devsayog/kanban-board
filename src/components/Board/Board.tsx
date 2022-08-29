import useBoolean from '@/hooks/useBoolean'
import { useAppSelector } from '@/store/reduxHooks'

import Column from '../Column'
import AppModal from '../common/AppModal'
import Button from '../common/Button'
import Form from '../common/Form'
import { Heading3 } from '../common/Typography'
import { selectBoards } from './boardSlice'

const Board = () => {
  const [value, { setFalse, setTrue }] = useBoolean(false)
  const { boards } = useAppSelector(selectBoards)
  return (
    <>
      <section className="flex space-x-6 overflow-x-auto py-4">
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
          submit={console.log}
          btnText="add new board"
          placeholder="your new board ..."
        />
      </AppModal>
    </>
  )
}

export default Board
