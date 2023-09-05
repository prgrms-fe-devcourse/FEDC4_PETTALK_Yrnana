import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider, createStore } from 'jotai'
import { BrowserRouter } from 'react-router-dom'
import { globalStyle } from '@/styles/index.tsx'
import { Global } from '@emotion/react'

const myStore = createStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename='/'>
    <Global styles={globalStyle} />
    <Provider store={myStore}>
      <App />
    </Provider>
  </BrowserRouter>
)
