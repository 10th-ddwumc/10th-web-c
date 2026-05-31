import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import { calculateTotals } from "./store/cartSlice";
import Navbar from "./components/Navbar";
import CartItem from "./components/CartItem";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white mt-8 rounded shadow">
        {cartItems.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            장바구니가 비어있어요 🛒
          </div>
        ) : (
          cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))
        )}
        <Footer />
      </div>
    </div>
  );
}

export default App;