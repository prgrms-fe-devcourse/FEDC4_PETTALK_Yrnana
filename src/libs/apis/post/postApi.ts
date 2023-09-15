import { axiosAPI } from '@/libs/apis/axios'
//import { CreatePostRequest } from '@/libs/apis/post/postType'
import { Post } from '@/libs/apis/post/postType'

const PostApi = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CREATE_POST: async (payload: any): Promise<Post> => {
    axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    const response = await axiosAPI.post('posts/create', payload)
    return response.data
  },
  DETAIL_POST: async (postId: string): Promise<Post> => {
    const response = await axiosAPI.get(`/posts/${postId}`)
    console.log(response)
    return response.data
  },
  GET_POSTS: async (channelId: string): Promise<Post[]> => {
    const response = await axiosAPI.get(`/posts/channel/${channelId}`)
    return response.data
  },
}

export default PostApi
