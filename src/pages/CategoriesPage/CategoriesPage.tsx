import { Button, Typography } from "antd";

import styles from "./CategoriesPage.module.css";
import CategoryList
  from "../../entities/Category/CategoryList/CategoryList.tsx";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routing/routes.ts";

const {Title} = Typography;
const CategoriesPage = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.CategoriesPage}>
      <div className={styles.categoriesTop}>
        <Title level={1}>CategoriesPage</Title>
        <Button
          type="primary"
          onClick={() => navigate(AppRoutes.createCategory)}
        >
          Create</Button>
      </div>

      <CategoryList />
    </div>
  );
};

export default CategoriesPage;