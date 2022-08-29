import type { ReactNode } from 'react'

import Header from './Header'

type LayoutProps = {
  children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <section className="flex min-h-screen w-full flex-col bg-gray-light-1 dark:bg-slate-3">
      <Header />
      <main className="container mx-auto flex basis-full flex-col pt-4 font-inter text-gray-dark-1 dark:text-gray-light-2">
        {children}
      </main>
    </section>
  )
}

export default Layout
