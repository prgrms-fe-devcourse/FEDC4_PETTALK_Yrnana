import { Global, ThemeProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createStore, Provider } from 'jotai'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { theme } from '@/styles/index'
import { globalStyle } from '@/styles/index.tsx'

import App from './App.tsx'

const myStore = createStore()
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={'/'}>
    <Global styles={globalStyle} />
    <ThemeProvider theme={theme}>
      <Provider store={myStore}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
)
