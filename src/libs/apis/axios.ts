import axios from 'axios'

export const BASE_URL = 'https://kdt.frontend.4th.programmers.co.kr:5004'

export const axiosAPI = axios.create({
  baseURL: BASE_URL,
})
