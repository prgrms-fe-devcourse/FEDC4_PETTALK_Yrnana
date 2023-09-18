import { atom, useAtom } from 'jotai'

// import { User } from '@/libs/apis/auth/authType'
// export const initialUser: User = {
//   coverImage: '', // 커버 이미지
//   image: '', // 프로필 이미지
//   role: '',
//   isOnline: false,
//   posts: [],
//   likes: [],
//   comments: [],
//   followers: [],
//   following: [],
//   notifications: [],
//   messages: [],
//   _id: '',
//   fullName: '',
//   email: '',
//   createdAt: '',
//   updatedAt: '',
// }

//로그인 한 해당 user정보
export const userAtom = atom({})
