import { User } from '@/libs/apis/auth/authType'
import { axiosAPI } from '@/libs/apis/axios'
import { Image } from '@/libs/apis/postImage/postImageType'

const PostImageApi = {
  CREATE_POST: async (payload: Image): Promise<User> => {
    axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    const response = await axiosAPI.post('users/upload-photo', payload)
    return response.data
  },
}

export default PostImageApi
