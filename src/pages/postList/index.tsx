import { Route, Routes } from 'react-router-dom'

import AppBarNavTemplate from '@/components/layouts/AppBarNavTemplate'
import PostListPage from '@/pages/postList/[channelId]'
import PostDetailPage from '@/pages/postList/[postId]'
import NewPostPage from '@/pages/postList/NewPost'

const PostRouter = () => {
  return (
    <Routes>
      <Route
        path={'/:channelId/*'}
        element={
          <AppBarNavTemplate hasNav={true}>
            <PostListPage />
          </AppBarNavTemplate>
        }
      />
      <Route
        path={'/:channelId/create/*'}
        element={
          <AppBarNavTemplate hasNav={false} title={'새 글 작성하기'}>
            <NewPostPage />
          </AppBarNavTemplate>
        }
      />
      <Route
        path={'/:channeId/create/:postId/*'}
        element={
          <AppBarNavTemplate hasNav={false} title={'게시글 상세보기'}>
            <PostDetailPage />
          </AppBarNavTemplate>
        }
      ></Route>
    </Routes>
  )
}

export default PostRouter
