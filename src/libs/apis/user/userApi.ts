import { Follow, User } from '@/libs/apis/auth/authType'
import { FriendListResponse } from '@/libs/apis/auth/authType'
import { axiosAPI } from '@/libs/apis/axios'
export const UserApi = {
  GET_USERS: async (): Promise<FriendListResponse[]> => {
    const response = await axiosAPI.get('/users/get-users')
    return response.data
  },
  GET_ONLINE_USERS: async (): Promise<User[]> => {
    const response = await axiosAPI.get('/users/online-users')
    return response.data
  },
  SERACH_USER: async (query: string): Promise<FriendListResponse[]> => {
    const response = await axiosAPI.get(`/search/users/${query}`)
    return response.data
  },
  FOLLOW_USER: async (userId: string): Promise<Follow> => {
    const response = await axiosAPI.post('/follow/create', {
      userId: userId,
    })
    return response.data
  },
  UNFOLLOW_USER: async (followId: string): Promise<Follow> => {
    const response = await axiosAPI.delete('/follow/delete', {
      data: {
        id: followId,
      },
    })
    return response.data
  },
}
