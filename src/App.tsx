import { Route, Routes } from 'react-router-dom'

import Layout from '@/components/layouts/Layout'
import ChattingRouter from '@/pages/chatting'
import ExamplePage from '@/pages/Example'
import FriendsRouter from '@/pages/friends'
import ChannelsRouter from '@/pages/home'
import CreateChannel from '@/pages/home/CreateChannel'
import LoginPage from '@/pages/login'
import MyProfileRouter from '@/pages/myprofile'
import PostRouter from '@/pages/postList'
import PrivateRoute from '@/pages/redirect/PrivateRoute'
import RegisterRouter from '@/pages/register'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PrivateRoute auth={true} />}>
          <Route path={'*'} element={<ChannelsRouter />} />
          <Route path={'/posts'} element={<PostRouter />} />
          <Route path={'/friends'} element={<FriendsRouter />}></Route>
          <Route path={'/myprofile'} element={<MyProfileRouter />}></Route>
          <Route path={'/chatting'} element={<ChattingRouter />}></Route>
        </Route>
        <Route element={<PrivateRoute auth={false} />}>
          <Route path={'/login/*'} element={<LoginPage />} />
          <Route path={'/register/*'} element={<RegisterRouter />} />
        </Route>
        <Route element={<PrivateRoute auth={true} superAuth={true} />}>
          <Route path={'/create'} element={<CreateChannel />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
