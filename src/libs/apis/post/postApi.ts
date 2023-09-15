import { axiosAPI } from '@/libs/apis/axios'
import { CreatePostRequest } from '@/libs/apis/post/postType'
import { Post } from '@/libs/apis/post/postType'

const PostApi = {
  CREATE_POST: async (payload: CreatePostRequest): Promise<Post> => {
    axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    const response = await axiosAPI.post('posts/create', payload)
    return response.data
  },
}

export default PostApi
