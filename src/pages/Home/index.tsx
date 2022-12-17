import {Outlet} from 'react-router-dom';
import SideNavigation from './SideNavigation';
import styles from './styles.module.css';

const Home = () => {
  return (
    <div className={styles.root}>
      <SideNavigation />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
