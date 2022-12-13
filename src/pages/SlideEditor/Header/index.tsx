import {ChevronLeft} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import styles from './styles.module.css';
import clsx from 'clsx';

export default function Header() {
  const navigate = useNavigate();
  const onBackPress = () => {
    navigate('/presentation');
  };

  return (
    <div className={styles.container}>
      <button className={clsx(styles.button, styles.backBtn)} onClick={onBackPress}>
        <ChevronLeft />
        Back
      </button>
      <h6 className={styles.title}>Tiêu đề: Khảo sát ý kiến sinh viên về lịch vấn đáp</h6>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <button className={styles.button} onClick={onBackPress}>
          Save
        </button>
        <button className={styles.button} onClick={onBackPress}>
          Present
        </button>
      </div>
    </div>
  );
}
