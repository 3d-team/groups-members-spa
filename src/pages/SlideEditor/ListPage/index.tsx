import {AddCircle} from '@mui/icons-material';
import React from 'react';
import styles from './styles.module.css';

const ListPage = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>List pages</p>

      <div>{/* List pages */}</div>

      <button className={styles.button}>
        <AddCircle />
        <p>Add new slide</p>
        <div></div>
      </button>
    </div>
  );
};

export default ListPage;
