import { Route, Routes } from 'react-router-dom'

import AppBarNavTemplate from '@/components/layouts/AppBarNavTemplate'
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
    </Routes>
  )
}

export default ChannelsRouter
