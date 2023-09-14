import { Route, Routes } from 'react-router-dom'

import AppBarNavTemplate from '@/components/layouts/AppBarNavTemplate'
import PostListPage from '@/pages/postList/[channelId]'

const PostRouter = () => {
  return (
    <Routes>
      <Route
        path={'/:channel._id/'}
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
