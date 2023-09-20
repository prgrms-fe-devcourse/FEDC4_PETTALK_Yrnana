import { User } from '@/libs/apis/auth/authType'
import { axiosAPI } from '@/libs/apis/axios'

export const UserApi = {
  GET_USERS: async (): Promise<User[]> => {
    const response = await axiosAPI.get('/users/get-users')
    return response.data
  },
  GET_ONLINE_USERS: async (): Promise<User[]> => {
    const response = await axiosAPI.get('/users/online-users')
    return response.data
  },
}
