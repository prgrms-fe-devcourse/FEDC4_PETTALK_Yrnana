import { atom } from 'jotai'

const initialDarkModeValue = sessionStorage.getItem('darkMode') === 'true'

export const darkModeAtom = atom(initialDarkModeValue)

export const toggleDarkModeAtom = atom(
  (get) => get(darkModeAtom),
  (get, set) => set(darkModeAtom, !get(darkModeAtom)),
)
