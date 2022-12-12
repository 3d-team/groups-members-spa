import CenterContainer from '@/components/CenterContainer';
import {ChartType, MockMultipleChoice, MultipleChoiceModel, PageModel} from '@/models/page';
import Helper from '@/ultilities/Helper';
import React, {useState} from 'react';
import Header from './Header';
import ListPage from './ListPage';
import PreviewSlide from './PreviewSlide';
import styles from './styles.module.css';
import ToolSide from './ToolSide';

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
    {name: 'Yes', value: 0},
    {name: 'No', value: 0},
  ],
};

const mocklistPage: any[] = [defaultPage, multipleChoicePage];

const SlideEditor = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [listPage, setListPage] = useState<any[]>(mocklistPage);
  const [typeChart, setTypeChart] = useState<ChartType>('bar-chart');

  const onSelectedPage = (index: number) => {
    console.log('@DUKE__onSelectedPage--', index);
    setSelectedIndex(index);
  };

  const onDeletePage = (index: number) => {
    console.log('@DUKE__onDeletePage--', listPage);
    setListPage(Helper.removeItemByIndex(listPage, index));
  };

  const addNewMultipleChoicePage = () => {
    setListPage(prev => {
      return [...prev, MockMultipleChoice];
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
        <div className={styles.centerContainer}>
          <PreviewSlide data={listPage[selectedIndex]} type={typeChart} />
        </div>
        <div className={styles.rightContainer}>
          <ToolSide />
        </div>
      </div>
    </div>
  );
};

export default SlideEditor;
