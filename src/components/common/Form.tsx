import type { FormEvent } from 'react'
import { useRef, useState } from 'react'

import Button from './Button'
import { Paragraph } from './Typography'

type FormProps = {
  btnText: string
  submit: (text: String) => void
  placeholder: string
}

const Form = ({ btnText, submit, placeholder }: FormProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
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
      <Button click={() => {}} text={btnText} />
    </form>
  )
}

export default Form
