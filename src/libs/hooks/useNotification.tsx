import { axiosAPI } from '@/libs/apis/axios'
interface NotificationProps {
  type: 'COMMENT' | 'FOLLOW' | 'LIKE' | 'MESSAGE'
  typeId: string // 댓글id, 팔로우id, 좋아요id, 메시지id 중 1
  userId: string // 알람을 보내고자 하는 유저 id -> 댓글, 좋아요일 경우 게시글 author_id, 팔로우, 메시지 일 경우 대상 id
  postId: string | null // type이 FOLLOW,MESSAGE일 경우 null, COMMENT,LIKE일 경우 게시글 id
  channelId?: string | undefined
}
export const useNotification = async ({ type, typeId, userId, postId }: NotificationProps) => {
  await axiosAPI
    .post('/notifications/create', {
      notificationType: type,
      notificationTypeId: typeId,
      userId: userId,
      postId: postId,
    })
    .then((response) => console.log(response))
    .catch((err) => console.log(err))
}
