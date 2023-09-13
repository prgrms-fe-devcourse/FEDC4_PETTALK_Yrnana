import axios, { AxiosError } from 'axios'
import { AxiosResponse } from 'axios'

import ApiException from '@/libs/apis/ApiExceptions'
import { ApiErrorScheme } from '@/libs/apis/ApiExceptions'
export const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

// Response interceptor
function interceptorResponseFulfilled(res: AxiosResponse) {
  if (200 <= res.status && res.status < 300) {
    return res.data
  }

  return Promise.reject(res.data)
}

function interceptorResponseRejected(error: AxiosError<ApiErrorScheme>) {
  if (error.response?.data?.message) {
    return Promise.reject(new ApiException(error.response.data, error.response.status))
  }
}

axiosAPI.interceptors.response.use(interceptorResponseFulfilled, interceptorResponseRejected)
