import { atom } from 'jotai'

export const initialURL = {
  channelId: '',
  postId: '',
}
//라우터 정보
export const urlAtom = atom(initialURL)
