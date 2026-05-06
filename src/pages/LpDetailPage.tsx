import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getLpDetail } from '../apis/lps'

const LpDetailPage = () => {
  const { lpId } = useParams()
  const navigate = useNavigate()

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['lp', lpId],
    queryFn: () => getLpDetail(Number(lpId)),
  })

  if (isPending) {
    return (
      <div className='flex justify-center items-center h-96'>
        <div className='text-pink-500 text-xl'>로딩 중...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex flex-col justify-center items-center h-96 gap-4'>
        <p className='text-red-500'>{error.message}</p>
        <button
          onClick={() => refetch()}
          className='bg-pink-500 text-white px-4 py-2 rounded'
        >
          다시 시도
        </button>
      </div>
    )
  }

  const lp = data?.data

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
      <div className='flex gap-3'>
        <button className='bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600'>
          ❤️ 좋아요
        </button>
        <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
          수정
        </button>
        <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
          삭제
        </button>
      </div>
    </div>
  )
}

export default LpDetailPage