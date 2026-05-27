import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotals } from './store/cartSlice'
import { type RootState } from './store'
import Navbar from './components/Navbar'
import CartList from './components/CartList'

function App() {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state: RootState) => state.cart)

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  return (
    <>
      <Navbar />
      <CartList />
    </>
  )
}

export default App