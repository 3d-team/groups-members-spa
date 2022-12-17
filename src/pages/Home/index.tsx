import {Outlet} from 'react-router-dom';
import SideNavigation from './SideNavigation';
import styles from './styles.module.css';

const Home = () => {
  return (
    <div className={styles.root}>
      <div className={styles.sideNavigation}>
        <SideNavigation />
      </div>
      <div className={styles.renderPageCtn}>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
