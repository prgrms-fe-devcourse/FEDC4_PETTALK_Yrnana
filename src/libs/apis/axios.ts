import axios from 'axios'

export const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})
