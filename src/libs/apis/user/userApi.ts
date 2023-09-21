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
  SERACH_USER: async (query: string): Promise<User[]> => {
    const response = await axiosAPI.get(`/search/users/${query}`)
    return response.data
  },
}
