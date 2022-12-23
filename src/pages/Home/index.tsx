import {useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import AddButton from './AddButton';
import {NAV_OPTIONS} from './index.props';
import SideNavigation from './SideNavigation';
import styles from './styles.module.css';

const Home = () => {
  const [activeNav, setActiveNav] = useState<number>(0);
  const navigate = useNavigate();

  const onPressNav = (index: number, link: string) => {
    setActiveNav(index);
    navigate(link);
  };

  return (
    <div className={styles.root}>
      <AddButton type={NAV_OPTIONS[activeNav].type} />
      <div className={styles.sideNavigation}>
        <SideNavigation onPressNav={onPressNav} activeNav={activeNav} />
      </div>
      <div className={styles.renderPageCtn}>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
