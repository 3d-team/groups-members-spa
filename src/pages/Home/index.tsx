import {useAppDispatch, useAppSelector} from '@/redux';
import {appActions} from '@/redux/feature/app/slice';
import {useEffect, useState} from 'react';
import Dashboard from '../Dashboard';
import MyProfile from '../MyProfile';
import Presentations from '../Presentations';
import AddButton from './AddButton';
import DialogContainer from './DialogContainer';
import {dialogRef, NavigationOptionType, NAV_OPTIONS} from './index.props';
import SideNavigation from './SideNavigation';
import styles from './styles.module.css';

const Home = () => {
  const activeNav: number = useAppSelector(state => state.app.currentNavIndex);
  const dispatcher = useAppDispatch();

  console.log('@DUKE___ASLJLFDJ', activeNav);

  const onPressNav = (index: number) => {
    dispatcher(appActions.updateNavIndex(index));
  };

  const renderPageContent = (key: NavigationOptionType) => {
    switch (key) {
      case 'classes':
        return <Dashboard />;
      case 'presentation':
        return <Presentations />;
      case 'account':
        return <MyProfile />;
      default:
        return <></>;
    }
  };

  return (
    <div className={styles.root}>
      <AddButton type={NAV_OPTIONS[activeNav].type} />
      <div className={styles.sideNavigation}>
        <SideNavigation onPressNav={onPressNav} activeNav={activeNav} />
      </div>
      <div className={styles.renderPageCtn}>{renderPageContent(NAV_OPTIONS[activeNav].type)}</div>
      <DialogContainer ref={dialogRef} />
    </div>
  );
};

export default Home;
