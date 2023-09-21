import { Route, Routes } from 'react-router-dom'

import AppBarNavTemplate from '@/components/layouts/AppBarNavTemplate'
import Chatting from '@/pages/chatting/Chatting'

const ChattingRouter = () => {
  return (
    <Routes>
      <Route
        path={'/'}
        element={
          <AppBarNavTemplate hasNav={false} hasSpacing={false} hasPadding={false}>
            <Chatting />
          </AppBarNavTemplate>
        }
      />
    </Routes>
  )
}

export default ChattingRouter
