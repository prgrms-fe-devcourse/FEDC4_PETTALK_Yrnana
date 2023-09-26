import { Route, Routes } from 'react-router-dom'

import UserDataRoute from '@/components/auth/UserDataRoute'
import AppBarNavTemplate from '@/components/layouts/AppBarNavTemplate'
import Layout from '@/components/layouts/Layout'
import ChattingRouter from '@/pages/chatting'
import ChattingListRouter from '@/pages/chattingList'
import FriendList from '@/pages/friends/FriendList'
import ChannelsRouter from '@/pages/home'
import CreateChannel from '@/pages/home/CreateChannel'
import LoginPage from '@/pages/login'
import MyProfileRouter from '@/pages/myprofile'
import NotFoundPage from '@/pages/notFound'
import NotificationRouter from '@/pages/notification'
import PostRouter from '@/pages/postList'
import PrivateRoute from '@/pages/redirect/PrivateRoute'
import RegisterRouter from '@/pages/register'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PrivateRoute auth={true} />}>
          <Route element={<UserDataRoute />}>
            <Route path={'/'} element={<ChannelsRouter />} />
            <Route path={'/posts/*'} element={<PostRouter />} />
            <Route
              path={'/friends'}
              element={
                <AppBarNavTemplate hasNav={true} title={'친구 목록'}>
                  <FriendList />
                </AppBarNavTemplate>
              }
            ></Route>
            <Route path={'/myprofile'} element={<MyProfileRouter />}></Route>
            <Route path={'/chatting'} element={<ChattingRouter />}></Route>
            <Route path={'/chattinglist'} element={<ChattingListRouter />}></Route>
            <Route path={'/notification/*'} element={<NotificationRouter />}></Route>
            <Route path={'*'} element={<NotFoundPage />}></Route>
          </Route>
        </Route>
        <Route element={<PrivateRoute auth={false} />}>
          <Route path={'/login/*'} element={<LoginPage />} />
          <Route path={'/register/*'} element={<RegisterRouter />} />
          <Route path={'*'} element={<NotFoundPage />}></Route>
        </Route>
        <Route element={<PrivateRoute auth={true} superAuth={true} />}>
          <Route path={'/create'} element={<CreateChannel />} />
          <Route path={'*'} element={<NotFoundPage />}></Route>
        </Route>
        <Route path={'*'} element={<NotFoundPage />}></Route>
      </Route>
    </Routes>
  )
}

export default App
