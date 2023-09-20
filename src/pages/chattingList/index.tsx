import { Route, Routes } from 'react-router-dom'

import ChattingList from '@/pages/chattingList/ChattingList'

const ChattingListRouter = () => {
  return (
    <Routes>
      <Route path={'/'} element={<ChattingList />}></Route>
    </Routes>
  )
}

export default ChattingListRouter
