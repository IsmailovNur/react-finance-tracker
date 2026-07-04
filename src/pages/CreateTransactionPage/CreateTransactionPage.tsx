import { Typography } from "antd";

import styles from "./CreateTransactionPage.module.css"
const {Title} = Typography;


const CreateTransactionPage = () => {
  return (
    <div className={styles.CreateTransactionPage}>
      <Title level={1}>CreateTransactionPage</Title>
    </div>
  );
};

export default CreateTransactionPage;