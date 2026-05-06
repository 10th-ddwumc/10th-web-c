import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface NavbarProps {
  onMenuClick: () => void
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { accessToken, nickname, logout } = useAuth()

  return (
    <nav className='bg-black text-white px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50'>
      <div className='flex items-center gap-4'>
        {/* 버거 버튼 */}
        <button onClick={onMenuClick} className='md:hidden'>
          <svg width="32" height="32" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M7.95 11.95h32m-32 12h32m-32 12h32"/>
          </svg>
        </button>
        <Link to='/' className='text-pink-500 font-bold text-xl'>
          돌려돌려LP판
        </Link>
      </div>

      <div className='flex gap-4 items-center'>
        {accessToken ? (
          <>
            <span className='text-white'>{nickname}님 반갑습니다.</span>
            <button onClick={logout} className='text-white hover:text-pink-500'>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to='/login' className='text-white hover:text-pink-500'>
              로그인
            </Link>
            <Link to='/signup' className='bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600'>
              회원가입
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar