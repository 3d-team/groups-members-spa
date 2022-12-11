import CenterContainer from '@/components/CenterContainer';
import {MultipleChoiceModel, PageModel} from '@/models/page';
import React, {useState} from 'react';
import Header from './Header';
import ListPage from './ListPage';
import styles from './styles.module.css';

const defaultPage: PageModel = {
  type: 'default',
  title: 'Hello everyone',
  backgroundImage: '',
};

const multipleChoicePage: MultipleChoiceModel = {
  type: 'multiple-choice',
  title: 'Are your ready?',
  backgroundImage: '',
  options: [
    {title: 'A', value: 2},
    {title: 'B', value: 7},
    {title: 'C', value: 5},
  ],
};

const listPage: any[] = [defaultPage, multipleChoicePage];

const SlideEditor = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const onSelectedPage = (index: number) => {
    console.log('@DUKE__onSelectedPage--', index);
    setSelectedIndex(index);
  };

  const onDeletePage = (index: number) => {
    console.log('@DUKE__onDeletePage--', index);
  };

  return (
    <div className={styles.container}>
      {/* Header: back button, saved button, present button */}
      <div className={styles.topContainer}>
        <Header />
      </div>
      {/* Body */}
      <div className={styles.bodyContainer}>
        <div className={styles.leftContainer}>
          <ListPage listPage={listPage} onSelect={onSelectedPage} onDelete={onDeletePage} selectedIndex={selectedIndex} />
        </div>
        <div className={styles.centerContainer}></div>
        <div className={styles.rightContainer}></div>
      </div>
    </div>
  );
};

export default SlideEditor;
