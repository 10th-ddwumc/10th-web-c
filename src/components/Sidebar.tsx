import { Link } from 'react-router-dom'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* PC: 항상 보임 / 모바일: 숨김 */}
      <aside className='hidden md:block w-64 bg-gray-900 text-white min-h-screen'>
        <div className='pt-6 px-6'>
          <nav className='flex flex-col gap-4'>
            <Link to='/' className='text-white hover:text-pink-500'>홈</Link>
            <Link to='/my' className='text-white hover:text-pink-500'>마이페이지</Link>
          </nav>
        </div>
      </aside>

      {/* 모바일: 버거 클릭시 열림 */}
      <aside className={`
        md:hidden fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-40
        transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className='pt-20 px-6'>
          <nav className='flex flex-col gap-4'>
            <Link to='/' className='text-white hover:text-pink-500'>홈</Link>
            <Link to='/my' className='text-white hover:text-pink-500'>마이페이지</Link>
          </nav>
        </div>
      </aside>

      {/* 모바일: 외부 클릭시 닫힘 */}
      {isOpen && (
        <div
          className='md:hidden fixed inset-0 z-30 bg-black bg-opacity-50'
          onClick={onClose}
        />
      )}
    </>
  )
}

export default Sidebar