import type { ApiTransaction, Transaction, TransactionState } from "./types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../shared/api/AxiosApi.ts";

const initialState: TransactionState = {
  transactionList: [],
  isLoading: false,
  error: null,
};

export const createTransaction = createAsyncThunk<void, Transaction, {
  rejectValue: string
}>(
  'transaction/create',
  async (transactionData, {rejectWithValue}) => {
    try {
      await axiosInstance.post('/transactions.json', transactionData);
    } catch {
      return rejectWithValue('Failed to create transaction');
    }
  }
);

export const fetchTransactions = createAsyncThunk<ApiTransaction[], void, {
  rejectValue: string
}>(
  'transaction/fetchAll',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get<Record<string, Transaction>>('/transactions.json');
      const data = response.data;
      if (!data) return [];

      return Object.keys(data).map(key => ({
        ...data[key],
        id: key
      }));
    } catch {
      return rejectWithValue('Failed to fetch transactions');
    }
  }
);

export const updateTransaction = createAsyncThunk<ApiTransaction, {
  id: string;
  data: Transaction
}, { rejectValue: string }>(
  'transaction/update',
  async ({id, data}, {rejectWithValue}) => {
    try {
      await axiosInstance.put(`/transactions/${id}.json`, data);
      return {...data, id};
    } catch {
      return rejectWithValue('Failed to update transaction');
    }
  }
);


const TransactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, state => {
        state.isLoading = true;
      })
      .addCase(createTransaction.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(createTransaction.rejected, state => {
        state.isLoading = false;
      })

      .addCase(fetchTransactions.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionList = action.payload;
      })
      .addCase(fetchTransactions.rejected, state => {
        state.isLoading = false;
      })

      .addCase(updateTransaction.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.transactionList.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.transactionList[index] = action.payload;
        }
      })
      .addCase(updateTransaction.rejected, state => {
        state.isLoading = false;
      });

  }
});


export const selectTransactionList = (state: {
  transaction: TransactionState
}) => state.transaction.transactionList;
export const selectTransactionIsLoading = (state: {
  transaction: TransactionState
}) => state.transaction.isLoading;

export const TransactionReducer = TransactionSlice.reducer;
