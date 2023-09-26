import { QueryClient } from '@tanstack/react-query'
import { QueryCache } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
/**
 * 전역 QueryClientProvider에서 사용되는 QueryClient입니다.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      alert('에러 발생! 올바른 경로로 서비스를 이용해주세요.')
      window.location.href = '/'
    },
  }),
})
