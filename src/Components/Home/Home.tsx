import { Outlet } from "react-router-dom";
import styles from "./Home.module.scss";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftPanel}>
        <LeftPanel />
      </div>
      <div className={styles.centerPanel}>
        <Outlet />
      </div>
      <div className={styles.rightPanel}>
        <RightPanel />
      </div>
    </div>
  );
};

export default Home;
