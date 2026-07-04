import { NavLink } from "react-router-dom";
import { AppRoutes } from "../../routing/routes.ts";
import { Typography } from "antd";

import styles from "./AppHeader.module.css";

const {Text} = Typography;

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <NavLink
          to={AppRoutes.main}
          className={styles.mainLink}
        >
          <Text className={styles.logoName}>TV Shows</Text>
        </NavLink>

      </div>
    </header>
  );
};

export default AppHeader;