import { Typography } from "antd";

import styles from "./CategoriesPage.module.css";

const {Title} = Typography;
const CategoriesPage = () => {
  return (
    <div className={styles.CategoriesPage}
    >
      <Title level={1}>CategoriesPage</Title>
    </div>
  );
};

export default CategoriesPage;