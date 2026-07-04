import { useEffect } from 'react';
import {
  deleteCategory,
  fetchCategories,
  selectCategoryIsLoading,
  selectCategoryList
} from "../CategorySlice.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../app/store.ts";

import Spinner from "../../../shared/Spinner/Spinner.tsx";
import CategoryItem from "./CategoryItem.tsx";

import styles from "./Category.module.css";
import { AppRoutes } from "../../../routing/routes.ts";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {

  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategoryList);
  const navigate = useNavigate();

  const isLoading = useSelector(selectCategoryIsLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCategory(id));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleEdit = (id: string) => {
    const editUrl = AppRoutes.editCategory.replace(':id', id);
    navigate(editUrl);
  };


  if (isLoading) return <Spinner />;

  return (
    <div className={styles.CategoryList}>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          id={category.id}
          name={category.name}
          type={category.type}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default CategoryList;