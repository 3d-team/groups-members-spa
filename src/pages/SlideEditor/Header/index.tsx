import {ChevronLeft} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import styles from './styles.module.css';
import clsx from 'clsx';

interface Props {
  onSave: () => void;
  onPresent: () => void;
  onShare: () => void;
  title?: string;
}

export default function Header({onSave, onPresent, onShare, title = ''}: Props) {
  const navigate = useNavigate();
  const onBackPress = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <button className={clsx(styles.button, styles.backBtn)} onClick={onBackPress}>
        <ChevronLeft />
        Back
      </button>
      <h6 className={styles.title}>{title}</h6>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {/* <button className={styles.button} onClick={onSave}>
          Save
        </button> */}
        <button className={styles.button} onClick={onPresent}>
          Present
        </button>
        <button className={styles.button} onClick={onShare}>
          Share
        </button>
      </div>
    </div>
  );
}
