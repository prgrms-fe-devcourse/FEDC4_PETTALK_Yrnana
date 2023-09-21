import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AppBar from '@/components/common/appBar'
import ListRow from '@/components/common/ListRow'
import Loading from '@/components/common/loading'
import Spacing from '@/components/common/spacing'
import { axiosAPI } from '@/libs/apis/axios'
import { Notification } from '@/libs/apis/notification/notificationType'
import { palette } from '@/styles/palette'

const Notification = () => {
  const [notifyList, setNotifyList] = useState([])
  const navigate = useNavigate()
  const getNotification = async () => {
    return await axiosAPI.get('/notifications')
  }
  const { data, isLoading, refetch } = useQuery(['notificationList'], getNotification)
  useEffect(() => {
    if (data !== undefined) setNotifyList(data.data)
    console.log(notifyList)
    handleSeenPost()
    // const polling = setInterval(() => {
    //   refetch()
    //   console.log(data)
    // }, 3000)

    // // 페이지에 벗어날 경우 polling X
    // return () => {
    //   clearInterval(polling)
    // }
  })
  const moveChattingPage = () => {
    navigate('/chattinglist')
  }
  // const movePostPage = (channel_id: string, posts_id: string) => {
  //   navigate(`/${channel_id}/${posts_id}`)
  // }
  const handleSeenPost = async () => {
    await axiosAPI
      .put('/notifications/seen')
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <AppBar mainPage={false} />
      <Spacing size={10} />
      {isLoading ? (
        <Loading />
      ) : (
        data?.data.map((v: Notification, i: number) =>
          v.comment ? (
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
                mainText={
                  <div>{`${v.user.fullName}님이 댓글을 남겼습니다. "${v.comment?.comment}"`}</div>
                }
                rightElement={<div>{}</div>}
                leftImage={v.user.image}
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
                mainText={<div>{`${v.user.fullName}님이 메시지를 보냈습니다.`}</div>}
                rightElement={<div>{}</div>}
                leftImage={v.user.image}
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
                mainText={<div>{`${v.user.fullName}님이 팔로우했습니다.`}</div>}
                rightElement={<div>{}</div>}
                leftImage={v.user.image}
              />
            </StyleNotifyList>
          ) : v.post ? (
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
                mainText={<div>{`${v.user.fullName}님이 게시글을 좋아합니다.`}</div>}
                rightElement={<div>{}</div>}
                leftImage={v.user.image}
              />
            </StyleNotifyList>
          ) : (
            ''
          ),
        )
      )}
    </>
  )
}
const StyleNotifyList = styled.div`
  cursor: pointer;
  margin: 20px 10px;
`

export default Notification
