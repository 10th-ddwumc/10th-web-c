import { useState, useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getLps } from '../apis/lps'
import ErrorMessage from '../components/ErrorMessage'
import SkeletonCard from '../components/SkeletonCard'
import LpCreateModal from '../components/LpCreateModal'
import useDebounce from '../hooks/useDebounce' 

const HomePage = () => {
  const navigate = useNavigate()
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const [isModalOpen, setIsModalOpen] = useState(false)  
  const [search, setSearch] = useState('')               
  const debouncedQuery = useDebounce(search, 300)     
  const observerRef = useRef<HTMLDivElement | null>(null)

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['lps', order, debouncedQuery],
    queryFn: ({ pageParam }) => getLps(pageParam as number, order, debouncedQuery || undefined),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.hasNext ? lastPage?.data?.nextCursor : undefined
    },
    enabled: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })

  // Intersection Observer - 스크롤 감지
  useEffect(() => {
    if (!observerRef.current) return
    const el = observerRef.current

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

if (isPending) {
  return (
    <div className='p-4'>
      <div className='flex gap-2 mb-6'>
        <div className='w-20 h-10 bg-gray-300 animate-pulse rounded' />
        <div className='w-24 h-10 bg-gray-300 animate-pulse rounded' />
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}
  if (isError) return <ErrorMessage message={error.message} onRetry={refetch} />

  const allLps = data?.pages.flatMap(page => page?.data?.data ?? [])

  return (
    <div className='p-4'>
      {/* 검색창 추가 */}
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='LP를 검색해보세요...'
        className='w-full border border-gray-300 rounded px-4 py-2 mb-4
                   focus:outline-none focus:border-pink-400'
      />
      {/* 정렬 버튼 */}
      <div className='flex gap-2 mb-6'>
        <button
          onClick={() => setOrder('desc')}
          className={`px-4 py-2 rounded ${order === 'desc' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          최신순
        </button>
        <button
          onClick={() => setOrder('asc')}
          className={`px-4 py-2 rounded ${order === 'asc' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          오래된순
        </button>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className='fixed bottom-6 right-6 w-14 h-14 bg-pink-500 text-white text-3xl rounded-full shadow-lg hover:bg-pink-600 z-40'
        >
        +
    </button>

      {/* LP 카드 목록 */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {allLps.map((lp: any) => (
          <div
            key={lp.id}
            onClick={() => navigate(`/lp/${lp.id}`)}
            className='relative group cursor-pointer overflow-hidden rounded-lg aspect-square bg-gray-200'
          >
            <img
              src={lp?.thumbnail}
              alt={lp?.title}
              className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
            />
            <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-3'>
              <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <p className='text-white font-bold text-sm'>{lp.title}</p>
                <p className='text-gray-300 text-xs'>
                  {new Date(lp.createdAt).toLocaleDateString()}
                </p>
                <p className='text-pink-400 text-xs'>❤️ {lp.likes?.length ?? 0}</p>
              </div>
            </div>
          </div>
        ))}

        {/* 다음 페이지 로딩 중 스켈레톤 */}
        {isFetchingNextPage && Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`skeleton-${i}`}
            className='rounded-lg aspect-square bg-gray-300 animate-pulse'
          />
        ))}
      </div>

      {/* 검색 결과 없을 때 */}
      {allLps.length === 0 && (
        <p className='text-center text-gray-400 mt-12'>검색 결과가 없어요 😢</p>
      )}
      
      {isModalOpen && <LpCreateModal onClose={() => setIsModalOpen(false)} />}

      {/* 스크롤 감지 div */}
      <div ref={observerRef} className='h-1' />
    </div>
  )
}

export default HomePage