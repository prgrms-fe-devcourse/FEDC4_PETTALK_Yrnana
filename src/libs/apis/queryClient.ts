import { QueryClient } from '@tanstack/react-query'

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
})
