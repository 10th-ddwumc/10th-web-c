import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { getLpDetail } from '../apis/lps'
import { getComments, createComment } from '../apis/comments'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { useRef, useEffect } from 'react'

const LpDetailPage = () => {
  const { lpId } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const [commentText, setCommentText] = useState('')
  const [commentError, setCommentError] = useState('')
  const observerRef = useRef<HTMLDivElement | null>(null)

  // LP 상세 조회
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['lp', lpId],
    queryFn: () => getLpDetail(Number(lpId)),
  })

  // 댓글 목록 조회
  const {
    data: commentsData,
    isPending: isCommentsPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['lpComments', lpId, order],
    queryFn: ({ pageParam }) =>
      getComments(Number(lpId), pageParam as number, order),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.hasNext ? lastPage?.data?.nextCursor : undefined,
  })

  // 스크롤 감지
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

  // 댓글 작성
  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      setCommentError('댓글을 입력해주세요.')
      return
    }
    try {
      await createComment(Number(lpId), commentText)
      setCommentText('')
      setCommentError('')
    } catch (err) {
      setCommentError('댓글 작성에 실패했어요.')
    }
  }

  if (isPending) return <LoadingSpinner />
  if (isError) return <ErrorMessage message={error.message} onRetry={refetch} />

  const lp = data?.data
  const allComments = commentsData?.pages.flatMap(
    (page) => page?.data?.data ?? []
  )

  return (
    <div className='max-w-2xl mx-auto p-6'>
      {/* 썸네일 */}
      <div className='w-full aspect-square bg-gray-200 rounded-lg mb-6 overflow-hidden'>
        <img
          src={lp?.thumbnail}
          alt={lp?.title}
          className='w-full h-full object-cover'
        />
      </div>

      {/* 제목 */}
      <h1 className='text-2xl font-bold mb-2'>{lp?.title}</h1>

      {/* 업로드일 */}
      <p className='text-gray-500 text-sm mb-4'>
        {new Date(lp?.createdAt).toLocaleDateString()}
      </p>

      {/* 좋아요 */}
      <p className='text-pink-500 mb-4'>❤️ {lp?.likes?.length ?? 0}</p>

      {/* 본문 */}
      <p className='text-gray-700 mb-6'>{lp?.content}</p>

      {/* 버튼들 */}
      <div className='flex gap-3 mb-8'>
        <button className='bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600'>
          ❤️ 좋아요
        </button>
        <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
          수정
        </button>
        <button
          onClick={() => navigate('/')}
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
        >
          삭제
        </button>
      </div>

      {/* 댓글 섹션 */}
      <div className='border-t pt-6'>
        <h2 className='text-xl font-bold mb-4'>댓글</h2>

        {/* 정렬 버튼 */}
        <div className='flex gap-2 mb-4'>
          <button
            onClick={() => setOrder('desc')}
            className={`px-3 py-1 rounded text-sm ${order === 'desc' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            최신순
          </button>
          <button
            onClick={() => setOrder('asc')}
            className={`px-3 py-1 rounded text-sm ${order === 'asc' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            오래된순
          </button>
        </div>

        {/* 댓글 작성 */}
        <div className='flex gap-2 mb-6'>
          <input
            type='text'
            placeholder='댓글을 입력해주세요'
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className='flex-1 border px-4 py-2 rounded outline-none focus:ring-2 focus:ring-pink-500'
          />
          <button
            onClick={handleCommentSubmit}
            className='bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600'
          >
            작성
          </button>
        </div>
        {commentError && <p className='text-red-500 text-sm mb-4'>{commentError}</p>}

        {/* 댓글 목록 */}
        {isCommentsPending ? (
          <div className='flex flex-col gap-3'>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className='flex gap-3 items-center'>
                <div className='w-10 h-10 rounded-full bg-gray-300 animate-pulse' />
                <div className='flex-1'>
                  <div className='h-4 bg-gray-300 animate-pulse rounded mb-2 w-1/4' />
                  <div className='h-4 bg-gray-300 animate-pulse rounded w-3/4' />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            {allComments?.map((comment: any) => (
              <div key={comment.id} className='flex gap-3'>
                <div className='w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center text-pink-600 font-bold flex-shrink-0'>
                  {comment.user?.name?.[0] ?? '?'}
                </div>
                <div>
                  <p className='font-bold text-sm'>{comment.user?.name}</p>
                  <p className='text-gray-700 text-sm'>{comment.content}</p>
                </div>
              </div>
            ))}

            {/* 추가 로딩 스켈레톤 */}
            {isFetchingNextPage && (
              <div className='flex flex-col gap-3'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className='flex gap-3 items-center'>
                    <div className='w-10 h-10 rounded-full bg-gray-300 animate-pulse' />
                    <div className='flex-1'>
                      <div className='h-4 bg-gray-300 animate-pulse rounded mb-2 w-1/4' />
                      <div className='h-4 bg-gray-300 animate-pulse rounded w-3/4' />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 스크롤 감지 div */}
        <div ref={observerRef} className='h-1' />
      </div>
    </div>
  )
}

export default LpDetailPage