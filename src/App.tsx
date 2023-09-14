import { Route, Routes } from 'react-router-dom'

import Layout from '@/components/layouts/Layout'
import ChattingRouter from '@/pages/chatting'
import FriendsRouter from '@/pages/friends'
import ChannelsRouter from '@/pages/home'
import LoginPage from '@/pages/login'
import MyProfileRouter from '@/pages/myprofile'
import PostRouter from '@/pages/postList'
import RegisterRouter from '@/pages/register'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={'*'} element={<ChannelsRouter />} />
        <Route path={'/posts/*'} element={<PostRouter />} />
        <Route path={'/friends'} element={<FriendsRouter />}></Route>
        <Route path={'/myprofile'} element={<MyProfileRouter />}></Route>
        <Route path={'/chatting'} element={<ChattingRouter />}></Route>
        <Route path={'/login/*'} element={<LoginPage />} />
        <Route path={'/register/*'} element={<RegisterRouter />} />
      </Route>
    </Routes>
  )
}

export default App
