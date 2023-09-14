import { User } from '@/libs/apis/auth/authType'
import { axiosAPI } from '@/libs/apis/axios'
import { Image } from '@/libs/apis/postImage/postImageType'

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTQzMDdjZDhmMTIxNjJlMmVhYSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNjk0NjgxODE4fQ.Zfza6chsiXM7cZzHLsJYfWTk7TeOtTP6eSrrxX62vEY'

const PostImageApi = {
  CREATE_POST: async (payload: Image): Promise<User> => {
    axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    const response = await axiosAPI.post('users/upload-photo', payload)
    return response.data
  },
}

export default PostImageApi
