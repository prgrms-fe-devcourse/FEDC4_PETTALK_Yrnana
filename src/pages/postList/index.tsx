import { Route, Routes } from 'react-router-dom'

import AppBarNavTemplate from '@/components/layouts/AppBarNavTemplate'
import PostListPage from '@/pages/postList/[channelId]'
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
    </Routes>
  )
}

export default PostRouter
