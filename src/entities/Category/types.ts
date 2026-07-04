export type CategoryType = "income" | "expense";

export const CATEGORY_TYPES = [
  {name: 'Income', id: 'income'},
  {name: 'Expense', id: 'expense'},
];

export interface Category {
  type: CategoryType;
  name: string;
}

export interface CategoryState {
  categoryList: Category[];
  isLoading: boolean;
  error: string | null;
}