import { axiosAPI } from '@/libs/apis/axios'
import { CommentType } from '@/libs/apis/comment/commentType'

interface Comment {
  comment: string
  postId: string
}

const CommentApi = {
  CREATE_COMMENT: async (payload: Comment): Promise<CommentType> => {
    axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    const response = await axiosAPI.post('/comments/create', payload)
    return response.data
  },
  DELETE_COMMENT: async (id: string): Promise<CommentType> => {
    axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    const response = await axiosAPI.delete('/comments/delete', {
      data: {
        id: id,
      },
    })
    return response.data
  },
}

export default CommentApi
