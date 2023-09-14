import { axiosAPI } from '@/libs/apis/axios'
import { CreatePostRequest } from '@/libs/apis/post/postType'
import { Post } from '@/libs/apis/post/postType'
const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTQzMDdjZDhmMTIxNjJlMmVhYSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNjk0NjgxODE4fQ.Zfza6chsiXM7cZzHLsJYfWTk7TeOtTP6eSrrxX62vEY'

const PostApi = {
  CREATE_POST: async (payload: CreatePostRequest): Promise<Post> => {
    axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    const response = await axiosAPI.post('posts/create', payload)
    return response.data
  },
}

export default PostApi
