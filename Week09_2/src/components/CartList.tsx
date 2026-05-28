import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../store'
import { increase, decrease, removeItem, clearCart, calculateTotals } from '../store/cartSlice'
import { openModal } from '../store/modalSlice';

const CartList = () => {
  const dispatch = useDispatch()
  const { cartItems, amount, total } = useSelector((state: RootState) => state.cart)

  const handleIncrease = (id: string) => {
    dispatch(increase(id))
    dispatch(calculateTotals())
  }
  const handleDecrease = (id: string) => {
    dispatch(decrease(id))
    dispatch(calculateTotals())
  }
  const handleRemove = (id: string) => {
    dispatch(removeItem(id))
    dispatch(calculateTotals())
  }
  const handleClear = () => {
    dispatch(clearCart())
  }

  return (
    <div className='max-w-2xl mx-auto p-4'>
       

      {cartItems.map((item) => (
        <div key={item.id} className='flex items-center gap-4 border-b py-4'>
          <img src={item.img} alt={item.title} className='w-16 h-16 object-cover rounded' />
          <div className='flex-1'>
            <p className='font-semibold'>{item.title}</p>
            <p className='text-sm text-gray-500'>{item.singer}</p>
            <p className='text-sm'>{item.price.toLocaleString()}원</p>
          </div>
          <div className='flex items-center gap-2'>
            <button onClick={() => handleIncrease(item.id)} className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'>+</button>
            <span>{item.amount}</span>
            <button onClick={() => handleDecrease(item.id)} className='px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'>-</button>
          </div>
          <button onClick={() => handleRemove(item.id)} className='text-red-400 hover:text-red-600'>✕</button>
        </div>
      ))}

      <div className='flex justify-end items-center mb-4'>
        <p className='mt-6'>
            <button
            onClick={() => dispatch(openModal())}
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
    >
            전체 삭제
            </button>
        </p>
        </div>

      <div className='mt-6 text-right'>
        <p className='text-lg'>총 수량: <span className='font-bold'>{amount}개</span></p>
        <p className='text-xl font-bold'>총 금액: {total.toLocaleString()}원</p>
        
      </div>

      

    </div>
  )
}

export default CartList