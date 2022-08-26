import type { ReactNode } from 'react'

import Header from './Header'

type LayoutProps = {
  children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <section className="min-h-screen w-full bg-gray-light-1">
      <Header />
      <main className="container mx-auto mt-16 font-inter">{children}</main>
    </section>
  )
}

export default Layout
