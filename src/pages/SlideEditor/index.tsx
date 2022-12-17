import {ChartType, MockMultipleChoice, MultipleChoiceModel, SlideModel} from '@/models/presentation';
import {useAppDispatch, useAppSelector} from '@/redux';
import PresentationThunks from '@/redux/feature/presentation/thunk';
import Helper from '@/ultilities/Helper';
import {useEffect, useState} from 'react';
import Header from './Header';
import ListPage from './ListPage';
import PreviewSlide from './PreviewSlide';
import styles from './styles.module.css';
import ToolSide from './ToolSide';

const defaultPage: MultipleChoiceModel = {
  type: 'multiple-choice',
  title: 'Are you ready?',
  backgroundImage: '',
  options: [
    {name: 'Yes', value: 0},
    {name: 'No', value: 0},
  ],
};

const multipleChoicePage: MultipleChoiceModel = {
  type: 'multiple-choice',
  title: 'Are you ready?',
  backgroundImage: '',
  options: [
    {name: 'Yes', value: 1},
    {name: 'No', value: 2},
  ],
};

const mocklistPage: any[] = [defaultPage, multipleChoicePage];

const SlideEditor = () => {
  const dispatcher = useAppDispatch();
  const present = useAppSelector(state => state.presentation.data);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [listPage, setListPage] = useState<MultipleChoiceModel[]>(present.slides);

  const [typeChart, setTypeChart] = useState<ChartType>('bar-chart');

  const onSelectedPage = (index: number) => {
    setSelectedIndex(index);
  };

  const onDeletePage = (index: number) => {
    if (listPage.length < 2) {
      return;
    }
    setListPage(Helper.removeItemByIndex(listPage, index));
  };

  const addNewMultipleChoicePage = () => {
    setListPage(prev => {
      return [...prev, MockMultipleChoice];
    });
  };
  const onChangeTypeChart = (type: ChartType) => {
    setTypeChart(type);
  };

  const onSubmitData = (data: MultipleChoiceModel) => {
    setListPage(prev => {
      const newList = [...prev];
      newList[selectedIndex] = data;
      return newList;
    });
  };

  const onSave = () => {
    dispatcher(PresentationThunks.saveAllSlides(listPage));
  };

  const onPresent = () => {};

  const onShare = () => {};

  // ----- Side Effect ----
  useEffect(() => {
    return () => {
      onSave();
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Header: back button, saved button, present button */}
      <div className={styles.topContainer}>
        <Header onSave={onSave} onPresent={onPresent} onShare={onShare} />
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
          <ToolSide onChangeChart={onChangeTypeChart} selectedType={typeChart} onSubmitData={onSubmitData} currentData={listPage[selectedIndex]} />
        </div>
      </div>
    </div>
  );
};

export default SlideEditor;
