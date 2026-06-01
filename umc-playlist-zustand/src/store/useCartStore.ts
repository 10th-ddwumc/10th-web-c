import { create } from "zustand";
import type { CartItem } from "../constants/cartItems";
import { cartItems } from "../constants/cartItems";

interface CartStore {
  cartItems: CartItem[];
  amount: number;
  total: number;
  isOpen: boolean;

  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openModal: () => void;
  closeModal: () => void;
}

const calculateTotals = (items: CartItem[]) => ({
  amount: items.reduce((sum, item) => sum + item.amount, 0),
  total: items.reduce((sum, item) => sum + item.amount * item.price, 0),
});

const useCartStore = create<CartStore>((set) => ({
  cartItems: cartItems,
  ...calculateTotals(cartItems),
  isOpen: false,

    increase: (id) =>
    set((state) => {
        const updated = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
        );
        return { cartItems: updated, ...calculateTotals(updated) };
    }),

    decrease: (id) =>
    set((state) => {
        const updated = state.cartItems
        .map((item) =>
            item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0);
        return { cartItems: updated, ...calculateTotals(updated) };
    }),

    removeItem: (id) =>
    set((state) => {
        const updated = state.cartItems.filter((item) => item.id !== id);
        return { cartItems: updated, ...calculateTotals(updated) };
    }),

  clearCart: () => set({ cartItems: [], amount: 0, total: 0 }),

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useCartStore;