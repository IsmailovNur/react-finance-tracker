import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../shared/api/AxiosApi.ts";
import type { ApiCategory, Category, CategoryState } from "./types.ts";

const initialState: CategoryState = {
  categoryList: [],
  isLoading: false,
  error: null,
};

export const createCategory = createAsyncThunk<void, Category, {
  rejectValue: string
}>(
  'category/create',
  async (categoryData, {rejectWithValue}) => {
    try {
      await axiosInstance.post('/categories.json', categoryData);
    } catch {
      return rejectWithValue('Failed to create category');
    }
  }
);

export const fetchCategories = createAsyncThunk<ApiCategory[], void, {
  rejectValue: string
}>(
  'category/fetchAll',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get<Record<string, Category>>('/categories.json');
      const data = response.data;

      if (!data) return [];

      return Object.keys(data).map(key => ({
        ...data[key],
        id: key
      }));
    } catch {
      return rejectWithValue('Failed to fetch categories');
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
        state.error = null;
      })
      .addCase(createCategory.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(fetchCategories.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      });

  }
})

export const selectCategoryIsLoading = (state: {
  category: CategoryState
}) => state.category.isLoading;
export const selectCategoryList = (state: {
  category: CategoryState
}) => state.category.categoryList;

export const CategoryReducer = CategorySlice.reducer;
