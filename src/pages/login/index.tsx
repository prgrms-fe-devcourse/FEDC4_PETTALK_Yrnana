import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Greetings from '@/components/common/greetings'
import Login from '@/pages/login/Login'

const LoginPage = () => {
  const [loading, setLoading] = useState(true)

  setTimeout(() => {
    setLoading(false)
  }, 11000)

  return (
    <>
      <Greetings className={loading ? '' : 'disappear'} />
      <Routes>
        <Route path={'/'} element={<Login />}></Route>
      </Routes>
    </>
  )
}

export default LoginPage
