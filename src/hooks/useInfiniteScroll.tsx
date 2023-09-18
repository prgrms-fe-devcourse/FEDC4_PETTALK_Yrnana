import { QueryKey, useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export const useInfiniteScroll = () => {
  const [ref, inView] = useInView()
}
