import {ChevronLeft} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import styles from './styles.module.css';
import clsx from 'clsx';

export default function Header() {
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
      <h6 className={styles.title}>Khảo sát ý kiến sinh viên về lịch vấn đáp</h6>
      <button className={styles.button} onClick={onBackPress}>
        Save
      </button>
    </div>
  );
}
