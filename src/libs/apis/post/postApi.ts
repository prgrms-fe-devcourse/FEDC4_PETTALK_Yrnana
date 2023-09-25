import { axiosAPI } from '@/libs/apis/axios'
import { Like, Post } from '@/libs/apis/post/postType'

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
  DELETE_POST: (id: string): Promise<void> => {
    axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    return axiosAPI.delete('posts/delete', {
      data: {
        id: id,
      },
    })
  },
  SEARCH_POST: async (query: string): Promise<Post[]> => {
    const response = await axiosAPI.get(`/search/all/${query}`)
    return response.data
  },
  LIKE_POST: async (postId: string): Promise<Like> => {
    const response = await axiosAPI.post('/likes/create', {
      postId: postId,
    })
    return response.data
  },
  UNLIKE_POST: async (id: string): Promise<Like> => {
    const response = await axiosAPI.delete('/likes/delete', {
      data: {
        id: id,
      },
    })
    return response.data
  },
}

export default PostApi
