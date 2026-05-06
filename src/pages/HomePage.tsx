import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getLps } from '../apis/lps'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'



const HomePage = () => {
  const navigate = useNavigate()
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['lps', order],
    queryFn: () => getLps(0, order),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })
  console.log(data)

if (isPending) return <LoadingSpinner />
if (isError) return <ErrorMessage message={error.message} onRetry={refetch} />

  return (
    <div className='p-4'>
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

      {/* LP 카드 목록 */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {data?.data?.data?.map((lp: any) => (
          <div
            key={lp.id}
            onClick={() => navigate(`/lp/${lp.id}`)}
            className='relative group cursor-pointer overflow-hidden rounded-lg aspect-square bg-gray-200'
          >
            {/* 썸네일 */}
            <img
            src={lp.thumbnail}
            alt={lp.title}
            crossOrigin='anonymous'
            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
            />

            {/* hover 오버레이 */}
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
      </div>
    </div>
  )
}

export default HomePage