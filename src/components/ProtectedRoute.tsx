import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accessToken } = useAuth()
  const location = useLocation()
  const [showModal, setShowModal] = useState(true)

  if (!accessToken) {
    if (showModal) {
      return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 max-w-sm w-full mx-4'>
            <h2 className='text-lg font-bold mb-2'>로그인이 필요해요!</h2>
            <p className='text-gray-600 mb-6'>
              로그인이 필요한 서비스입니다. 로그인을 해주세요!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className='w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600'
            >
              확인
            </button>
          </div>
        </div>
      )
    }
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute