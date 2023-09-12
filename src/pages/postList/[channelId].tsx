import { useLocation } from 'react-router-dom'
const PostListPage = () => {
  const lectureId = Number(useLocation().pathname.split('/')[3])
  return <div>{'포스트 목록을 보여줍니다.'}</div>
}

export default PostListPage
