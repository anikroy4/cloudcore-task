import { configureStore } from '@reduxjs/toolkit';
import productSliceReducer from './productSlice';

export const store = configureStore({
  reducer: {
    products: productSliceReducer,
  },
});



