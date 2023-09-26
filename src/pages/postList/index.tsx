import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { Suspense } from 'react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import Loading from '@/components/common/loading'
import AppBarNavTemplate from '@/components/layouts/AppBarNavTemplate'
import { ChannelApi } from '@/libs/apis/channel/ChannelApi'
import { urlAtom } from '@/libs/store/urlAtom'
import PostListPage from '@/pages/postList/[channelId]'
import PostDetailPage from '@/pages/postList/[postId]'
import EditPostPage from '@/pages/postList/EditPost'
import NewPostPage from '@/pages/postList/NewPost'
const PostRouter = () => {
  const setChannelName = () => {
    const channelID = useLocation().pathname.split('/')[2]
    if (channelID) {
      const { data } = useQuery(['channels'], () => ChannelApi.GET_CHANNEL(), {
        cacheTime: 0,
      })
      const name = data?.filter((data) => data._id === channelID)
      if (name) {
        return name[0].name
      }
    }
    return '게시글 보기'
  }
  const urlData = useAtomValue(urlAtom)
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path={':channelId/*'}
          element={
            <AppBarNavTemplate hasNav={true} backurl={' '} title={setChannelName()}>
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
