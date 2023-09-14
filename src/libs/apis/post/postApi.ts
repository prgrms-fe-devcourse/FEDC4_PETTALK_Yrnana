import { axiosAPI } from '@/libs/apis/axios'
import { CreatePostRequest } from '@/libs/apis/post/postType'

const PostApi = {
  CREATE_POST: async (payload: CreatePostRequest) => {
    const data = await axiosAPI.post('posts/create', { payload })
    return data
  },
}

export default PostApi
