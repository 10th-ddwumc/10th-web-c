import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login } from '../apis/auth'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login: authLogin } = useAuth()
  const from = (location.state as any)?.from?.pathname || '/'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await login(email, password)
      authLogin(data.data.accessToken, data.data.name)
      navigate(from, { replace: true })
    } catch (err) {
      setError('이메일 또는 비밀번호가 올바르지 않아요.')
    }
  }

  return (
    <div className='min-h-screen bg-black flex items-center justify-center'>
      <div className='bg-gray-900 p-8 rounded-lg w-full max-w-md'>
        <h1 className='text-pink-500 text-2xl font-bold text-center mb-6'>
          돌려돌려LP판
        </h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='email'
            placeholder='이메일'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-gray-800 text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-pink-500'
          />
          <input
            type='password'
            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-gray-800 text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-pink-500'
          />

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button
            type='submit'
            className='bg-pink-500 text-white py-3 rounded font-bold hover:bg-pink-600'
          >
            로그인
          </button>
        </form>

        <p className='text-gray-400 text-center mt-4'>
          계정이 없으신가요?{' '}
          <Link to='/signup' className='text-pink-500 hover:underline'>
            회원가입
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage