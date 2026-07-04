import { Outlet } from "react-router-dom";
import AppHeader from "../../widgets/AppHeader/AppHeader.tsx";

import styles from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <AppHeader />

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;