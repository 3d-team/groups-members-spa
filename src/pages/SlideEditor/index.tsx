import CenterContainer from '@/components/CenterContainer';
import {MultipleChoiceModel, PageModel} from '@/models/page';
import React, {useState} from 'react';
import Header from './Header';
import ListPage from './ListPage';
import styles from './styles.module.css';

const defaultPage: PageModel = {
  type: 'default',
  title: 'Hello Everyone',
  backgroundImage: '',
};

const multipleChoicePage: MultipleChoiceModel = {
  type: 'multiple-choice',
  title: 'Are you ready?',
  backgroundImage: '',
  options: [
    {title: 'Yes', value: 0},
    {title: 'No', value: 0},
  ],
};

const mocklistPage: any[] = [defaultPage, multipleChoicePage];

const SlideEditor = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [listPage, setListPage] = useState<any[]>([]);

  const onSelectedPage = (index: number) => {
    console.log('@DUKE__onSelectedPage--', index);
    setSelectedIndex(index);
  };

  const onDeletePage = (index: number) => {
    console.log('@DUKE__onDeletePage--', index);
  };

  const addNewMultipleChoicePage = () => {
    const newItem: MultipleChoiceModel = {
      type: 'multiple-choice',
      title: 'Are you ready?',
      backgroundImage: '',
      options: [
        {title: 'Yes', value: 0},
        {title: 'No', value: 0},
      ],
    };
    setListPage(prev => {
      return [...prev, newItem];
    });
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
          <ListPage listPage={listPage} addNewPage={addNewMultipleChoicePage} onSelect={onSelectedPage} onDelete={onDeletePage} selectedIndex={selectedIndex} />
        </div>
        <div className={styles.centerContainer}></div>
        <div className={styles.rightContainer}></div>
      </div>
    </div>
  );
};

export default SlideEditor;
