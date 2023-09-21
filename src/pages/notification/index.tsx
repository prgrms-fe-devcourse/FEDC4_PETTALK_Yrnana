import { Route, Routes } from 'react-router-dom'

import Notification from '@/pages/notification/Notification'
const NotificationRouter = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Notification />}></Route>
    </Routes>
  )
}

export default NotificationRouter
