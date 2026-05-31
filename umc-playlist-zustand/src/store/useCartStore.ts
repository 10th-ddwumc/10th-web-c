import { create } from "zustand";
import type { CartItem } from "../constants/cartItems";
import { cartItems } from "../constants/cartItems";

interface CartStore {
  // 상태
  cartItems: CartItem[];
  amount: number;
  total: number;
  isOpen: boolean;

  // 액션
  increase: (id: number) => void;
  decrease: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  openModal: () => void;
  closeModal: () => void;
}

const useCartStore = create<CartStore>((set, get) => ({
  // 초기 상태
  cartItems: cartItems,
  amount: cartItems.length,
  total: 0,
  isOpen: false,

  // 액션
  increase: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      ),
    })),

  decrease: (id) =>
    set((state) => {
      const item = state.cartItems.find((i) => i.id === id);
      if (item && item.amount <= 1) {
        return {
          cartItems: state.cartItems.filter((i) => i.id !== id),
        };
      }
      return {
        cartItems: state.cartItems.map((i) =>
          i.id === id ? { ...i, amount: i.amount - 1 } : i
        ),
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i.id !== id),
    })),

  clearCart: () => set({ cartItems: [], amount: 0, total: 0 }),

  calculateTotals: () => {
    const { cartItems } = get();
    const amount = cartItems.reduce((sum, item) => sum + item.amount, 0);
    const total = cartItems.reduce(
      (sum, item) => sum + item.amount * item.price,
      0
    );
    set({ amount, total });
  },

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useCartStore;