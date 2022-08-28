import { Paragraph } from './Typography'

type Chipsprops = {
  text: string
  btn?: boolean
  close?: () => void
}
const Chips = ({ text, btn, close }: Chipsprops) => {
  return (
    <div className="mr-2 mb-1 flex items-center rounded-2xl bg-gray-light-1 py-1 px-2 font-light dark:bg-slate-1">
      <Paragraph
        className="text-black dark:text-gray-light-1"
        text={text}
        size="sm"
      />
      {btn && (
        <button
          onClick={close && close}
          className="ml-1 rounded-full p-0.5 ring-gray-dark-1 focus:outline-none focus-visible:ring-1 dark:ring-gray-light-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="h-3 w-3 cursor-pointer  text-secondary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m-15 0l15 15"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default Chips
