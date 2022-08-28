import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useMemo, useState } from 'react'

type UseBooleanActions = {
  setValue: Dispatch<SetStateAction<boolean>>
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
}
type UseBooleanFunction = (initial: boolean) => [boolean, UseBooleanActions]

export type UseBoolean = [boolean, UseBooleanActions]

const useBoolean: UseBooleanFunction = (initial) => {
  const [value, setValue] = useState<boolean>(initial)

  const toggle = useCallback(() => setValue((prev) => !prev), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  const actions = useMemo(
    () => ({ setValue, toggle, setTrue, setFalse }),
    [setFalse, setTrue, toggle],
  )

  return [value, actions]
}

export default useBoolean
