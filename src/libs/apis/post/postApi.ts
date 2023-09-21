import { User } from '@/libs/apis/auth/authType'
import { axiosAPI } from '@/libs/apis/axios'
import { Post } from '@/libs/apis/post/postType'

const PostApi = {
  CREATE_POST: async (payload: FormData): Promise<Post> => {
    axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    const response = await axiosAPI.post('posts/create', payload)
    return response.data
  },
  DETAIL_POST: async (postId: string): Promise<Post> => {
    const response = await axiosAPI.get(`/posts/${postId}`)
    return response.data
  },
  GET_POSTS: async (channelId: string): Promise<Post[]> => {
    const response = await axiosAPI.get(`/posts/channel/${channelId}`)
    return response.data
  },
  UPDATE_POST: async (payload: FormData): Promise<Post> => {
    axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    const response = await axiosAPI.put('posts/update', payload)
    return response.data
  },
  SEARCH_POST: async (query: string): Promise<Post[]> => {
    const response = await axiosAPI.get(`/search/all/${query}`)
    return response.data
  },
}

export default PostApi
