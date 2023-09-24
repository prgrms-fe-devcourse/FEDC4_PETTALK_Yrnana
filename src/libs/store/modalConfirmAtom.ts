import { atom } from 'jotai'

export const modalConfirmAtom = atom(false)
export const modalConfirmFuncAtom = atom({ fn: () => {} })
export const modalConfirmTextAtom = atom('')
