import type { ReactNode } from 'react'

import Header from './Header'

type LayoutProps = {
  children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <section className="min-h-screen w-full bg-gray-light-1 dark:bg-slate-dark">
      <Header />
      <main className="container mx-auto pt-16 font-inter">{children}</main>
    </section>
  )
}

export default Layout
