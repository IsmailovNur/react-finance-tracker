export type CategoryType = "income" | "expense";

export interface Category {
  type: CategoryType;
  name: string;
}