import {TemplatePage} from '@/models/page';
import {AddCircle} from '@mui/icons-material';
import clsx from 'clsx';
import React from 'react';
import Card from './Card';
import styles from './styles.module.css';

const ListPage = () => {
  const list: TemplatePage[] = [
    'default',
    'multiple-choice',
    'multiple-choice',
    'multiple-choice',
    'multiple-choice',
    'multiple-choice',
    'multiple-choice',
    'multiple-choice',
    'multiple-choice',
    'multiple-choice',
    'multiple-choice',
  ];
  return (
    <div className={styles.container}>
      <p className={styles.title}>List pages</p>

      <div className={styles.listCardCtn}>
        <div className={styles.listCard}>
          {/* List pages */}
          {list.map((item, index) => {
            return <Card template={item} key={index} />;
          })}
        </div>
      </div>
      <button className={styles.button}>
        <AddCircle />
        <p>Add new slide</p>
        <div></div>
      </button>
    </div>
  );
};

export default ListPage;
