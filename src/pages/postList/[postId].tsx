import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'

import PostApi from '@/libs/apis/post/postApi'

const PostDetailPage = () => {
  const postId = useLocation().pathname.split('/')[3]
  const { data, isLoading } = useQuery(['posts', postId], () => PostApi.DETAIL_POST(postId))
  return (
    <>
      <div>{data?.title}</div>
    </>
  )
}

export default PostDetailPage
