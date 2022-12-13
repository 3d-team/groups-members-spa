import {SlideModel, TemplatePage} from '@/models/presentation';
import {BarChart, BubbleChart, Delete} from '@mui/icons-material';
import clsx from 'clsx';
import styles from './styles.module.css';

interface Props {
  data: SlideModel;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export default function Card({data, isSelected = false, onSelect, onDelete}: Props) {
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
    <div className={clsx([styles.container, isSelected && styles.isCurrentActive])}>
      {/* Brief Content */}

      <div className={styles.cardCtn}>
        {renderIcon(data.type)}
        <p className={styles.title}>{data.title}</p>
        {/* Action Container */}
        <div className={styles.actionCtn}>
          <button className={clsx(styles.outerButton, styles.button)} onClick={onSelect}></button>
          <button className={clsx(styles.innerButton, styles.button)} onClick={onDelete}>
            <Delete />
          </button>
        </div>
      </div>
    </div>
  );
}
