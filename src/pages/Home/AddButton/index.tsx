import {Add} from '@mui/icons-material';
import clsx from 'clsx';
import styles from './styles.module.css';

const AddButton = () => {
  return (
    <div className={clsx(styles.container, styles.button)}>
      <Add sx={{fontSize: 50, color: '#333'}} />
      <button>Tạo lớp học mới</button>
      <button>Mời</button>
    </div>
  );
};

export default AddButton;
