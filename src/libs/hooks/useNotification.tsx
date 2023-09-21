import { useMutation } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

import { axiosAPI } from '@/libs/apis/axios'
import { userAtom } from '@/libs/store/userAtom'
interface NotificationProps {
  type: 'COMMENT' | 'FOLLOW' | 'LIKE' | 'MESSAGE'
  typeId: string // 댓글id, 팔로우id, 좋아요id, 메시지id 중 1
  userId: string // 알람을 보내고자 하는 유저 id -> 댓글, 좋아요일 경우 게시글 author_id, 팔로우, 메시지 일 경우 대상 id
  postId: string | null // type이 FOLLOW,MESSAGE일 경우 null, COMMENT,LIKE일 경우 게시글 id
  channelId?: string | undefined
}
export const useNotification = async ({
  type,
  typeId,
  userId,
  postId,
  channelId,
}: NotificationProps) => {
  console.log(type, typeId, userId, postId)
  //   const userData = useAtomValue(userAtom)
  //   const notifyMutation = useMutation((body: object) => postNotification(body), {
  //     onSuccess: (data) => {
  //       console.log(data)
  //     },
  //     onError: (err) => {
  //       console.log(err)
  //     },
  //   })
  const body = {
    notificationType: type,
    notificationTypeId: typeId,
    userId: userId,
    postId: postId,
  }
  //   notifyMutation.mutate(body)
  //   postNotification()
  //   const postNotification = async (body: object) => {
  await axiosAPI
    .post('/notifications/create', {
      notificationType: type,
      notificationTypeId: typeId,
      userId: userId,
      postId: postId,
    })
    .then((response) => console.log(response))
    .catch((err) => console.log(err))
  //   }
}
