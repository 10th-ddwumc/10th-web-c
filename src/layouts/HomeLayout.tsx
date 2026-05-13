import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const HomeLayout = () => {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className='min-h-screen bg-white'>
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className='flex pt-16'>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
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