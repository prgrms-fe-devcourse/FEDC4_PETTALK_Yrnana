import { Global, ThemeProvider } from '@emotion/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createStore, Provider } from 'jotai'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { queryClient } from '@/libs/apis/queryClient'
import { theme } from '@/styles/index'
import { globalStyle } from '@/styles/index.tsx'

import App from './App.tsx'

const myStore = createStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={'/'}>
    <Global styles={globalStyle} />
    <ThemeProvider theme={theme}>
      <Provider store={myStore}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <App />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
)
