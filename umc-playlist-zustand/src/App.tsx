import { useEffect } from "react";
import useCartStore from "./store/useCartStore";
import Navbar from "./components/Navbar";
import CartItem from "./components/CartItem";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

function App() {
  const cartItems = useCartStore((state) => state.cartItems);
  const isOpen = useCartStore((state) => state.isOpen);

  return (
    <div className="min-h-screen bg-gray-100">
      {isOpen && <Modal />}
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white mt-8 rounded shadow">
        {cartItems.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            장바구니가 비어있어요 🛒
          </div>
        ) : (
          cartItems.map((item) => <CartItem key={item.id} {...item} />)
        )}
        <Footer />
      </div>
    </div>
  );
}

export default App;