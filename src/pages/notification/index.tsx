import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Loading from '@/components/common/loading'
import AppBarNavTemplate from '@/components/layouts/AppBarNavTemplate'
import Notification from '@/pages/notification/Notification'
const NotificationRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path={'/'}
          element={
            <AppBarNavTemplate hasNav={true} title={'알림 목록'}>
              <Notification />
            </AppBarNavTemplate>
          }
        ></Route>
      </Routes>
    </Suspense>
  )
}

export default NotificationRouter
