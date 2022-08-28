type ButtonProps = {
  text: string
  click: () => void
}
const Button = ({ text, click }: ButtonProps) => {
  return (
    <button
      onClick={click}
      className="flex min-w-fit items-center space-x-2 self-start rounded border-0 bg-secondary px-3 py-2 capitalize text-gray-light-1 transition hover:bg-secondary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
    >
      <span>{text}</span>{' '}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  )
}

export default Button
