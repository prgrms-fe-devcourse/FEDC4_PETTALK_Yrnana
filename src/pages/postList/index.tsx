import { Route, Routes } from 'react-router-dom'

import AppBarNavTemplate from '@/components/layouts/AppBarNavTemplate'
import PostListPage from '@/pages/postList/PostList'

const PostRouter = () => {
  return (
    <Routes>
      <Route
        path={'/:channelId'}
        element={
          <AppBarNavTemplate hasNav={true}>
            <PostListPage />
          </AppBarNavTemplate>
        }
      />
    </Routes>
  )
}

export default PostRouter
