import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signup } from '../apis/auth'

const SignupPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signup(name, email, password, bio, avatar)
      navigate('/login')
    } catch (err) {
      setError('회원가입에 실패했어요. 다시 시도해주세요.')
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
            type='text'
            placeholder='이름'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='bg-gray-800 text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-pink-500'
          />
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
          <input
            type='text'
            placeholder='자기소개'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className='bg-gray-800 text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-pink-500'
          />
          <input
            type='text'
            placeholder='프로필 이미지 URL'
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className='bg-gray-800 text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-pink-500'
          />

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button
            type='submit'
            className='bg-pink-500 text-white py-3 rounded font-bold hover:bg-pink-600'
          >
            회원가입
          </button>
        </form>

        <p className='text-gray-400 text-center mt-4'>
          이미 계정이 있으신가요?{' '}
          <Link to='/login' className='text-pink-500 hover:underline'>
            로그인
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage