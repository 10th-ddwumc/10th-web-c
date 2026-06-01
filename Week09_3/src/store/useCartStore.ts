import { create } from 'zustand';

interface CartStore {
  items: [];
  clearCart: () => void;
}

const useCartStore = create<CartStore>((set) => ({
  items: [],
  clearCart: () => set({ items: [] }),
}));

export default useCartStore;
