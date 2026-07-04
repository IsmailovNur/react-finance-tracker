import { Typography } from "antd";

import styles from "./CategoriesPage.module.css";
import CategoryList
  from "../../entities/Category/CategoryList/CategoryList.tsx";

const {Title} = Typography;
const CategoriesPage = () => {
  return (
    <div className={styles.CategoriesPage}>
      <Title level={1}>CategoriesPage</Title>

      <CategoryList />

    </div>
  );
};

export default CategoriesPage;