import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider, createStore } from 'jotai'
import { BrowserRouter } from 'react-router-dom'
import { globalStyle } from '@/styles/index.tsx'
import { Global } from '@emotion/react'
import { theme } from '@/styles/index'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from '@emotion/react'

const myStore = createStore()
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename='/'>
    <Global styles={globalStyle} />
    <ThemeProvider theme={theme}>
      <Provider store={myStore}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
)
