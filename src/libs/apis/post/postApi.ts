import { axiosAPI } from '@/libs/apis/axios'
import { CreatePostRequest } from '@/libs/apis/post/postType'
import { Post } from '@/libs/apis/post/postType'

const PostApi = {
  CREATE_POST: async (payload: CreatePostRequest): Promise<Post> => {
    axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    const response = await axiosAPI.post('posts/create', payload)
    return response.data
  },
  DETAIL_POST: async (postId: string): Promise<Post> => {
    const response = await axiosAPI.get(`/posts/${postId}`)
    return response.data
  },
}

export default PostApi
