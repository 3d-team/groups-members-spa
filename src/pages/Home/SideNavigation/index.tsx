import {AccountCircle, ExitToAppRounded, Home, Slideshow} from '@mui/icons-material';
import clsx from 'clsx';
import {NavigationOptionType, NAV_OPTIONS} from '../index.props';

import styles from './styles.module.css';

const NavIcon = ({type}: {type: NavigationOptionType}) => {
  switch (type) {
    case 'classes':
      return <Home sx={{fontSize: 40}} />;
    case 'presentation':
      return <Slideshow sx={{fontSize: 40}} />;
    case 'account':
      return <AccountCircle sx={{fontSize: 40}} />;
    default:
      return <></>;
  }
};

interface Props {
  onPressNav: (index: number) => void;
  activeNav: number;
}

const SideNavigation = ({onPressNav, activeNav}: Props) => {
  return (
    <div className={styles.navContainer}>
      <div>
        {NAV_OPTIONS.map((item, index) => {
          return (
            <div className={clsx(styles.navItem, index === activeNav && styles.navActive)} onClick={() => onPressNav(index)}>
              <NavIcon type={item.type} />
              <span>{item.displayName}</span>
            </div>
          );
        })}
      </div>

      <div className={clsx(styles.navItem, styles.logout)}>
        <ExitToAppRounded sx={{fontSize: 40}} />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default SideNavigation;
