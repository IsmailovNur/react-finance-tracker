import { useEffect } from 'react';
import {
  fetchCategories,
  selectCategoryIsLoading,
  selectCategoryList
} from "../CategorySlice.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../app/store.ts";

import Spinner from "../../../shared/Spinner/Spinner.tsx";
import CategoryItem from "./CategoryItem.tsx";

import styles from "./Category.module.css";

const CategoryList = () => {

  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategoryList);
  console.log(categories);

  const isLoading = useSelector(selectCategoryIsLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.CategoryList}>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          id={category.id}
          name={category.name}
          type={category.type}
        />
      ))}
    </div>
  );
};

export default CategoryList;