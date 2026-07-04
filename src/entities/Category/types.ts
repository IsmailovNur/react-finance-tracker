export type CategoryType = "income" | "expense";

export const CATEGORY_TYPES = [
  {name: 'income', id: 'income'},
  {title: 'expense', id: 'expense'},
];

export interface Category {
  type: CategoryType;
  name: string;
}