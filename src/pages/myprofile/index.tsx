import { Route, Routes } from 'react-router-dom'

import AppBarNavTemplate from '@/components/layouts/AppBarNavTemplate'
import MyPage from '@/pages/myprofile/MyPage'

const MyProfileRouter = () => {
  return (
    <Routes>
      <Route
        path={'/'}
        element={
          <AppBarNavTemplate hasNav={false} title={'마이페이지'}>
            <MyPage />
          </AppBarNavTemplate>
        }
      ></Route>
    </Routes>
  )
}

export default MyProfileRouter
