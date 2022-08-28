export type Stack = {
  id: string
  text: string
}
export type Task = {
  id: string
  title: string
  description: string
  date: Date
  stacks: Stack[] | undefined | []
}
export type Board = {
  id: string
  title: string
  tasks: Task[] | []
}
