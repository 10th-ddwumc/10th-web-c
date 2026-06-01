import useCartStore from "../store/useCartStore";
import type { CartItem as CartItemType } from "../constants/cartItems";

const CartItem = ({ id, title, artist, amount, price, img }: CartItemType) => {
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <img src={img} alt={title} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1 ml-4">
        <h3 className="font-bold">{title}</h3>
        <p className="text-gray-500 text-sm">{artist}</p>
        <p className="text-gray-700">${price.toLocaleString()}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => decrease(id)}
          className="bg-gray-200 px-2 py-1 rounded"
        >
          -
        </button>
        <span>{amount}</span>
        <button
          onClick={() => increase(id)}
          className="bg-gray-200 px-2 py-1 rounded"
        >
          +
        </button>
        <button
          onClick={() => removeItem(id)}
          className="text-red-500 ml-2"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CartItem;