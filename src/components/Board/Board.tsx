import { board } from '@/data'

import Column from '../Column'
import Button from '../common/Button'

const Board = () => {
  return (
    <section className="flex space-x-6 overflow-x-auto py-4">
      {board.map((b, i) => (
        <Column
          index={i}
          key={b.id}
          id={b.id}
          title={b.title}
          tasks={b.tasks}
        />
      ))}
      <Button click={() => {}} text="create new board" />
    </section>
  )
}

export default Board
