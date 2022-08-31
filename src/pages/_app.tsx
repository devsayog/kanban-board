import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'

import Layout from '@/components/common/Layout'
import store from '@/store/strore'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" storageKey="kanban-theme">
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </DndProvider>
    </ThemeProvider>
  )
}

export default MyApp
