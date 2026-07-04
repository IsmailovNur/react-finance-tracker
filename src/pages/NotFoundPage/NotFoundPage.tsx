import { Typography } from "antd";
import "./NotFoundPage.module.css";

import styles from "./NotFoundPage.module.css";

const {Title} = Typography;

const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <Title level={1}>Not Found</Title>
    </div>
  );
};

export default NotFoundPage;