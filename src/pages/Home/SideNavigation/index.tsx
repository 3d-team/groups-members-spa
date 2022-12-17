import {AccountCircle, ExitToAppRounded, Home, Logout, School, Slideshow} from '@mui/icons-material';
import clsx from 'clsx';

import styles from './styles.module.css';

const SideNavigation = () => {
  return (
    <div className={styles.navContainer}>
      {/* <div className={clsx(styles.navItem, styles.logo)}>
        <School sx={{fontSize: 50, color: '#FF3366'}} />
        <span>3DClassroom</span>
      </div> */}
      {/* Home: Class list */}
      <div>
        <div className={styles.navItem}>
          <Home sx={{fontSize: 40}} />
          <span>Classes</span>
        </div>
        {/* Presentations */}
        <div className={styles.navItem}>
          <Slideshow sx={{fontSize: 40}} />
          <span>Presentations</span>
        </div>
        {/* Personal Setting */}
        <div className={styles.navItem}>
          <AccountCircle sx={{fontSize: 40}} />
          <span>Account</span>
        </div>
      </div>

      <div className={clsx(styles.navItem, styles.logout)}>
        <ExitToAppRounded sx={{fontSize: 40}} />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default SideNavigation;
