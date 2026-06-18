import { useParams } from 'react-router-dom'

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>()

  return (
    <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
      <p className="text-[#555]">Movie ID: {movieId}</p>
    </div>
  )
}
