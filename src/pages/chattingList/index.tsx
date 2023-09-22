import { Route, Routes } from 'react-router-dom'

import AppBarNavTemplate from '@/components/layouts/AppBarNavTemplate'
import ChattingList from '@/pages/chattingList/ChattingList'

const ChattingListRouter = () => {
  return (
    <Routes>
      <Route
        path={'/'}
        element={
          <AppBarNavTemplate hasNav={true}>
            <ChattingList />
          </AppBarNavTemplate>
        }
      />
    </Routes>
  )
}

export default ChattingListRouter
