type ButtonProps = {
  text: string
  click: () => void
}
const Button = ({ text, click }: ButtonProps) => {
  return (
    <button
      onClick={click}
      className="w-[304px] min-w-fit self-start rounded border-0 bg-secondary px-3 py-2 capitalize text-gray-light-1 transition hover:bg-secondary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
    >
      {text}
    </button>
  )
}

export default Button
