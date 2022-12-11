import CenterContainer from '@/components/CenterContainer';
import React from 'react';
import Header from './Header';
import ListPage from './ListPage';
import styles from './styles.module.css';

const SlideEditor = () => {
  return (
    <div className={styles.container}>
      {/* Header: back button, saved button, present button */}
      <div className={styles.topContainer}>
        <Header />
      </div>
      {/* Body */}
      <div className={styles.bodyContainer}>
        <div className={styles.leftContainer}>
          <ListPage />
        </div>
        <div className={styles.centerContainer}></div>
        <div className={styles.rightContainer}></div>
      </div>
      {/* Top action: New slide button, import button */}
      {/* Left slide: list of mini slide*/}
      {/* Center: current slide */}
      {/* Rigth action:  */}
    </div>
  );
};

export default SlideEditor;
