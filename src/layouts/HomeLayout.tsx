import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import useSidebar from '../hooks/useSidebar'  

const HomeLayout = () => {
  const navigate = useNavigate()
  const { isOpen, close, toggle } = useSidebar()  // useState 대신

  return (
    <div className='min-h-screen bg-white'>
      <Navbar onMenuClick={toggle} />              {/* toggle로 교체 */}
      <div className='flex pt-16'>
        <Sidebar isOpen={isOpen} onClose={close} /> {/* isOpen, close로 교체 */}
        <main className='flex-1 p-4'>
          <Outlet />
        </main>
      </div>

      <button
        onClick={() => navigate('/lp/new')}
        className='fixed bottom-8 right-8 w-14 h-14 bg-pink-500 text-white rounded-full text-3xl shadow-lg hover:bg-pink-600 z-50'
      >
        +
      </button>
    </div>
  )
}

export default HomeLayout