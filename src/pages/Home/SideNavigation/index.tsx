import {AccountCircle, ExitToAppRounded, Home, Logout, School, Slideshow} from '@mui/icons-material';
import clsx from 'clsx';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import styles from './styles.module.css';

type NavItem = 'classes' | 'presentation' | 'account';
interface NavItemModel {
  type: NavItem;
  displayName: string;
  link: string;
}

const NavIcon = ({type}: {type: NavItem}) => {
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

const navData: NavItemModel[] = [
  {
    type: 'classes',
    displayName: 'Class',
    link: '/',
  },
  {
    type: 'presentation',
    displayName: 'Presentation',
    link: '/presentation',
  },
  {
    type: 'account',
    displayName: 'Account',
    link: '/myprofile',
  },
];

const SideNavigation = () => {
  const [activeNav, setActiveNav] = useState<number>(0);
  const navigate = useNavigate();
  const onPressNav = (index: number, link: string) => {
    setActiveNav(index);
    navigate(link);
  };
  return (
    <div className={styles.navContainer}>
      <div>
        {navData.map((item, index) => {
          return (
            <div className={clsx(styles.navItem, index === activeNav && styles.navActive)} onClick={() => onPressNav(index, item.link)}>
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
