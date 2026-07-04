import { configureStore } from '@reduxjs/toolkit';
import { CategoryReducer } from "../entities/Category/CategorySlice.ts";
import {
  TransactionReducer
} from "../entities/Transaction/TransactionSlice.ts";

export const store = configureStore({
  reducer: {
    category: CategoryReducer,
    transaction: TransactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;