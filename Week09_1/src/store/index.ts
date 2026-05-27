import { configureStore } from '@reduxjs/toolkit';
// 기존에 작성하신 cartSlice 등 리듀서들을 가져오는 import 문들...
import cartReducer from './cartSlice'; 

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // 다른 리듀서가 있다면 여기에 추가
  },
});

// 🔴 이 두 줄이 누락되었거나 'export' 키워드가 빠져있을 확률이 매우 높습니다!
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;