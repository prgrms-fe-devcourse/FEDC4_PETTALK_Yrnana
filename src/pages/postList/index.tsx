import { useAtom } from 'jotai'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Loading from '@/components/common/loading'
import AppBarNavTemplate from '@/components/layouts/AppBarNavTemplate'
import { urlAtom } from '@/libs/store/urlAtom'
import PostListPage from '@/pages/postList/[channelId]'
import PostDetailPage from '@/pages/postList/[postId]'
import EditPostPage from '@/pages/postList/EditPost'
import NewPostPage from '@/pages/postList/NewPost'

const PostRouter = () => {
  const [urlData, setUrlData] = useAtom(urlAtom)
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path={':channelId/*'}
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
          path={'/:channeId/:postId/*'}
          element={
            <AppBarNavTemplate
              hasNav={false}
              title={'게시글 상세보기'}
              backurl={`posts/${urlData.channelId}`}
            >
              <PostDetailPage />
            </AppBarNavTemplate>
          }
        ></Route>
        <Route
          path={'/:channeId/:postId/editpost'}
          element={
            <AppBarNavTemplate hasNav={false} title={'글 수정하기'}>
              <EditPostPage />
            </AppBarNavTemplate>
          }
        ></Route>
      </Routes>
    </Suspense>
  )
}

export default PostRouter
