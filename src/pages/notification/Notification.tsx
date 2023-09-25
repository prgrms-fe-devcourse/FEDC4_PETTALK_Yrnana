import styled from '@emotion/styled'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import defaultProfileImage from '@/assets/images/defaultProfileImage.png'
import AppBar from '@/components/common/appBar'
import ListRow from '@/components/common/listRow'
import Loading from '@/components/common/loading'
import Spacing from '@/components/common/spacing'
import { axiosAPI } from '@/libs/apis/axios'
import { Notification } from '@/libs/apis/notification/notificationType'
import { userAtom } from '@/libs/store/userAtom'
import { palette } from '@/styles/palette'

const Notification = () => {
  const [notifyList, setNotifyList] = useState([])
  const navigate = useNavigate()
  const userData = useAtomValue(userAtom)
  const getNotification = async () => {
    return await axiosAPI.get('/notifications')
  }
  const { data, isLoading } = useQuery(['notificationList'], getNotification, {
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    retry: 3,
    onSuccess: (data) => {
      if (data !== undefined) setNotifyList(data.data)
    },
  })
  useEffect(() => {
    seenMutation.mutate()
  }, [])
  const moveChattingPage = () => {
    navigate('/chattinglist')
  }
  const movePostPage = (postId: string | undefined | null) => {
    const channelId = userData.posts.find((v) => v._id === postId)?.channel
    navigate(`/posts/${channelId}/${postId}`)
  }
  const seenMutation = useMutation(() => handleSeenPost())
  const handleSeenPost = async () => {
    return await axiosAPI.put('/notifications/seen')
  }

  return (
    <>
      <AppBar mainPage={false} />
      <Spacing size={10} />
      {isLoading ? (
        <Loading />
      ) : (
        <StyleNotifyWrapper>
          {data?.data.map((v: Notification, i: number) =>
            v.comment ? (
              <StyleNotifyList key={v._id} onClick={() => movePostPage(v.post)}>
                {i == 0 ? (
                  ''
                ) : (
                  <hr
                    style={{
                      marginBottom: 20,
                      border: `1px solid ${palette.GRAY300}`,
                    }}
                  />
                )}

                <ListRow
                  mainText={<div>{`게시글에 댓글이 달렸습니다. "${v.comment?.comment}"`}</div>}
                  rightElement={<div>{}</div>}
                  leftImage={defaultProfileImage}
                />
              </StyleNotifyList>
            ) : v.message ? (
              <StyleNotifyList key={v._id} onClick={moveChattingPage}>
                {i == 0 ? (
                  ''
                ) : (
                  <hr
                    style={{
                      marginBottom: 20,
                      border: `1px solid ${palette.GRAY300}`,
                    }}
                  />
                )}
                <ListRow
                  mainText={<div>{'메시지가 도착했습니다!'}</div>}
                  rightElement={<div>{}</div>}
                  leftImage={defaultProfileImage}
                />
              </StyleNotifyList>
            ) : v.follow ? (
              <StyleNotifyList key={v._id}>
                {i == 0 ? (
                  ''
                ) : (
                  <hr
                    style={{
                      marginBottom: 20,
                      border: `1px solid ${palette.GRAY300}`,
                    }}
                  />
                )}
                <ListRow
                  mainText={<div>{`${v.user.fullName}님을 팔로우했습니다.`}</div>}
                  rightElement={<div>{}</div>}
                  leftImage={defaultProfileImage}
                />
              </StyleNotifyList>
            ) : v.post ? (
              <StyleNotifyList key={v._id} onClick={() => movePostPage(v.post)}>
                {i == 0 ? (
                  ''
                ) : (
                  <hr
                    style={{
                      marginBottom: 20,
                      border: `1px solid ${palette.GRAY300}`,
                    }}
                  />
                )}
                <ListRow
                  mainText={<div>{`친구가 ${v.user.fullName}님의 게시글을 좋아합니다.`}</div>}
                  rightElement={<div>{}</div>}
                  leftImage={defaultProfileImage}
                />
              </StyleNotifyList>
            ) : (
              ''
            ),
          )}
        </StyleNotifyWrapper>
      )}
    </>
  )
}
const StyleNotifyList = styled.div`
  cursor: pointer;
  margin: 20px 10px;
`
const StyleNotifyWrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
  max-height: calc(100% - 100px);
`

export default Notification
