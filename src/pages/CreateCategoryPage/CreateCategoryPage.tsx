import { Typography } from "antd";

import styles from "./CreateCategoryPage.module.css";
const {Title} = Typography;
const CreateCategoryPage = () => {
  return (
    <div className={styles.CreateCategoryPage}>
      <Title level={1}>CreateCategoryPage</Title>
    </div>
  );
};

export default CreateCategoryPage;