import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import defaultProfileImage from '@/assets/images/defaultProfileImage.png'
import AppBar from '@/components/common/appBar'
import ListRow from '@/components/common/ListRow'
import Loading from '@/components/common/loading'
import { axiosAPI } from '@/libs/apis/axios'
import { Notification } from '@/libs/apis/notification/notificationType'

const Notification = () => {
  const [notifyList, setNotifyList] = useState([])
  const getNotification = async () => {
    return await axiosAPI.get('/notifications')
  }
  const { data, isLoading, refetch } = useQuery(['notificationList'], getNotification)
  useEffect(() => {
    if (data !== undefined) setNotifyList(data.data)
    console.log(notifyList)

    const polling = setInterval(() => {
      refetch()
      console.log(data)
    }, 3000)

    // 페이지에 벗어날 경우 polling X
    return () => {
      clearInterval(polling)
    }
  })
  return (
    <>
      <AppBar mainPage={false} />
      {isLoading ? (
        <Loading />
      ) : (
        data?.data.map((v: Notification) =>
          v.comment ? (
            <StyleNotifyList key={v._id}>
              <ListRow
                mainText={
                  <div>{`${v.user.fullName}님이 댓글을 남겼습니다. "${v.comment?.comment}"`}</div>
                }
                rightElement={<div>{}</div>}
                leftImage={defaultProfileImage}
              />
            </StyleNotifyList>
          ) : v.message ? (
            <StyleNotifyList key={v._id}>
              <ListRow
                mainText={<div>{`${v.user.fullName}님이 메시지를 보냈습니다. "${v.message}"`}</div>}
                rightElement={<div>{}</div>}
                leftImage={defaultProfileImage}
              />
            </StyleNotifyList>
          ) : v.follow ? (
            <StyleNotifyList key={v._id}>
              <ListRow
                mainText={<div>{`${v.user.fullName}님이 팔로우했습니다.`}</div>}
                rightElement={<div>{}</div>}
                leftImage={defaultProfileImage}
              />
            </StyleNotifyList>
          ) : v.post ? (
            <StyleNotifyList key={v._id}>
              <ListRow
                mainText={<div>{`${v.user.fullName}님이 게시글을 좋아합니다.`}</div>}
                rightElement={<div>{}</div>}
                leftImage={defaultProfileImage}
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
