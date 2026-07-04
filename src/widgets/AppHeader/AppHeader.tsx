import { NavLink } from "react-router-dom";
import { AppRoutes } from "../../routing/routes.ts";
import { Typography } from "antd";

import styles from "./AppHeader.module.css";

const {Text} = Typography;

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerLeft}>
          <NavLink
            to={AppRoutes.main}
            className={styles.mainLink}
          >
            <Text className={styles.logoName}>Finance</Text>
          </NavLink>
        </div>

        <div className={styles.headerRight}>
          <NavLink
            to={AppRoutes.categories}
            className={({ isActive }) =>
              isActive ? `${styles.headerLink} ${styles.activeLink}` : styles.headerLink
            }
          >
            Categories
          </NavLink>
          <NavLink
            to={AppRoutes.createTransaction}
            className={({ isActive }) =>
              isActive ? `${styles.headerLink} ${styles.activeLink}` : styles.headerLink
            }
          >
            Add Transaction
          </NavLink>
        </div>

      </div>
    </header>
  );
};

export default AppHeader;