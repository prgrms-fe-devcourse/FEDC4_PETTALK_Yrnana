import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { User } from '@/libs/apis/auth/authType'
import { axiosAPI } from '@/libs/apis/axios'
import { userAtom } from '@/libs/store/userAtom'

const userDataRoute = () => {
  const setUserData = useSetAtom(userAtom)

  const getUserData = async (): Promise<User> => {
    const response = await axiosAPI.get('/auth-user')
    setUserData(response.data)
    return response.data
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserData()
    }
  }, [localStorage.getItem('token')])

  return <Outlet></Outlet>
}

export default userDataRoute
