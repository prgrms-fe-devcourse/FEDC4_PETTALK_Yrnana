import { Route, Routes } from 'react-router-dom'

import AppBarNavTemplate from '@/components/layouts/AppBarNavTemplate'
import CreateChannel from '@/pages/home/CreateChannel'
import MainPage from '@/pages/home/MainPage'
const ChannelsRouter = () => {
  return (
    <Routes>
      <Route
        path={'/'}
        element={
          <AppBarNavTemplate hasNav={true}>
            <MainPage />
          </AppBarNavTemplate>
        }
      />
      <Route
        path={'/create'}
        element={
          <AppBarNavTemplate hasNav={false} title={'채널 생성하기'}>
            <CreateChannel />
          </AppBarNavTemplate>
        }
      ></Route>
    </Routes>
  )
}

export default ChannelsRouter
