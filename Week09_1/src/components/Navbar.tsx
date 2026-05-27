import { useSelector } from 'react-redux'
import { type RootState } from '../store'

const Navbar = () => {
  const { amount } = useSelector((state: RootState) => state.cart)

  return (
    <div className='flex justify-between items-center p-4 bg-gray-800 text-white'>
      <h1 className='text-2xl font-semibold'>ynu_Playlist</h1>
    </div>
  )
}

export default Navbar