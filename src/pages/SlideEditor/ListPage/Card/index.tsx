import {MultipleChoiceModel, PageModel, TemplatePage} from '@/models/page';
import {BarChart, BubbleChart, Delete} from '@mui/icons-material';
import clsx from 'clsx';
import Default from '../../Template/Default';
import MultipleChoice from '../../Template/MultipleChoice';
import styles from './styles.module.css';

interface Props {
  data: PageModel;
}

export default function Card({data}: Props) {
  const mockdata: PageModel = {
    title: 'Are you oke right now?',
    backgroundImage: 'https://wallpaper.dog/large/5447432.jpg',
    type: 'multiple-choice',
  };

  const isActive = true;

  const renderIcon = (type: TemplatePage) => {
    switch (type) {
      case 'multiple-choice':
        return <BarChart />;
      default:
        return <BubbleChart />;
    }
  };

  return (
    <div className={clsx([styles.container, isActive && styles.isCurrentActive])}>
      {/* Brief Content */}

      <div className={styles.cardCtn}>
        {renderIcon(mockdata.type)}
        <p className={styles.title}>{mockdata.title}</p>
        {/* Action Container */}
        <div className={styles.actionCtn}>
          <button
            className={clsx(styles.outerButton, styles.button)}
            onClick={() => {
              console.log('@DUKE__choosed');
            }}></button>
          <button
            className={clsx(styles.innerButton, styles.button)}
            onClick={() => {
              console.log('@DUKE__delete');
            }}>
            <Delete />
          </button>
        </div>
      </div>
    </div>
  );
}
