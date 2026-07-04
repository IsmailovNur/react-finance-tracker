export type CategoryType = "income" | "expense";

export const CATEGORY_TYPES = [
  {name: 'Income', id: 'income'},
  {name: 'Expense', id: 'expense'},
];

export interface Category {
  type: CategoryType;
  name: string;
}

export interface ApiCategory extends Category {
  id: string;
}

export interface CategoryState {
  categoryList: ApiCategory[];
  isLoading: boolean;
  error: string | null;
}