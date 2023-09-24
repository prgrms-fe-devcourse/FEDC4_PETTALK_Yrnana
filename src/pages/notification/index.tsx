import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Loading from '@/components/common/loading'
import Notification from '@/pages/notification/Notification'
const NotificationRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={'/'} element={<Notification />}></Route>
      </Routes>
    </Suspense>
  )
}

export default NotificationRouter
