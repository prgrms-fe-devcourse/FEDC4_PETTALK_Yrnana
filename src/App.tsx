import { Route, Routes } from 'react-router-dom'

import Layout from '@/components/layouts/Layout'
import ChannelsRouter from '@/pages/channels'
import ChattingRouter from '@/pages/chatting'
import FriendsRouter from '@/pages/friends'
import LoginPage from '@/pages/login'
import MyProfileRouter from '@/pages/myprofile'
import RegisterRouter from '@/pages/register'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={'/'} element={<ChannelsRouter />} />
        <Route path={'/friends'} element={<FriendsRouter />}></Route>
        <Route path={'/profile'} element={<MyProfileRouter />}></Route>
        <Route path={'/chatting'} element={<ChattingRouter />}></Route>
      </Route>
      <Route path={'/login'} element={<LoginPage />} />
      <Route path={'/register'} element={<RegisterRouter />} />
    </Routes>
  )
}

export default App
