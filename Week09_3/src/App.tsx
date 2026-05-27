import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals } from './store/cartSlice';
import { type RootState } from './store';
import Navbar from './components/Navbar';
import CartList from './components/CartList';
import Modal from './components/Modal';

function App(){
  const dispatch = useDispatch();
  
  // 1. 스토어에서 장바구니 아이템들과 모달의 열림 상태를 각각 가져옵니다.
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { isOpen } = useSelector((state: RootState) => state.modal);

  // 2. 장바구니 아이템이 변경될 때마다 총 수량과 금액을 자동으로 계산합니다.
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <div className="App">
      <Navbar />
      <main className="p-4">
        <CartList />
      </main>

      {/* 3. 모달의 isOpen 상태가 true일 때만 화면에 오버레이 모달을 띄웁니다. */}
      {isOpen && <Modal />}
    </div>
  );
}

export default App;