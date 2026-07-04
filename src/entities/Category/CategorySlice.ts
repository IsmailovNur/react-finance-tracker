import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../shared/api/AxiosApi.ts";
import type { Category, CategoryState } from "./types.ts";

const initialState: CategoryState = {
  categoryList: [],
  isLoading: false,
  error: null,
};

export const createCategory = createAsyncThunk<void, Category, {
  rejectValue: string
}>(
  'category/create',
  async (categoryData, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/categories.json', categoryData);
    } catch {
      return rejectWithValue('Failed to create category');
    }
  }
);

const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, state => {
        state.isLoading = false;
      })

  }
})

export const CategoryReducer = CategorySlice.reducer;
export const selectCategoryIsLoading = (state: { category: CategoryState }) => state.category.isLoading;