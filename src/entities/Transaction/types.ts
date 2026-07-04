import type { CategoryType } from "../Category/types.ts";

export interface Transaction {
  categoryId: string;
  amount: number;
  createdAt: string;
}

export interface ApiTransaction extends Transaction {
  id: string;
}

export interface TransactionState {
  transactionList: ApiTransaction[];
  isLoading: boolean;
  error: string | null;
}

export interface TransactionFormValues {
  type: CategoryType;
  category: string;
  amount: number;
}