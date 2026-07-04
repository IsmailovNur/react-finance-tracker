import { Spin } from "antd";
import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.spinnerBlock}>
      <Spin size="large"/>
    </div>
  );
};

export default Spinner;