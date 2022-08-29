import { Dialog, Transition } from '@headlessui/react'
import type { ReactNode } from 'react'
import { Fragment } from 'react'

type AppModalProps = {
  value: boolean
  setFalse: () => void
  children: ReactNode
  fn?: () => void
}
const AppModal = ({ value, setFalse, children, fn }: AppModalProps) => {
  return (
    <Transition appear show={value} as={Fragment} afterLeave={fn}>
      <Dialog as="div" className="relative z-10" onClose={setFalse}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-1"
          leave="ease-in duartion-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/80 dark:bg-white/40" />
        </Transition.Child>
        <div className="fixed inset-0">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-1 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="w-full max-w-lg overflow-hidden rounded-md bg-gray-light-1 py-4 px-8 dark:bg-slate-3">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default AppModal
