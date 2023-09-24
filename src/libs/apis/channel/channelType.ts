export type Channel = {
  authRequired: boolean
  posts: string[]
  _id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export type ChannelCreateRequest = {
  authRequired: boolean // 채널 내용을 로그인한 사람만 볼 수 있는지 여부
  description: string // 채널 설명
  name: string // 채널 이름
}
