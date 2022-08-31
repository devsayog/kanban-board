import type { FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import Button from './Button'
import { Paragraph } from './Typography'

type FormProps = {
  btnText: string
  submit: (text: string) => void
  placeholder: string
  title?: string
  icon?: boolean
}

const Form = ({
  btnText,
  submit,
  placeholder,
  title,
  icon = true,
}: FormProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    if (!ref.current) {
      return
    }
    ref.current.value = title || ''
  }, [title])
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (!ref.current) {
      return null
    }
    const value = ref.current.value.trim()
    if (!value) {
      return setError('Please provide valid value')
    }
    return submit(value)
  }

  return (
    <form className="mt-3 flex flex-col space-y-3" onSubmit={onSubmit}>
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className="rounded border-2 text-gray-dark-1 focus:outline-none focus-visible:ring-1 dark:ring-primary-dark"
      />
      {error && (
        <Paragraph
          text={error}
          size="sm"
          className="text-secondary-dark dark:text-secondary"
        />
      )}
      <Button icon={icon} click={() => {}} text={btnText} />
    </form>
  )
}

export default Form
