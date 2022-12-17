import {Add} from '@mui/icons-material';
import clsx from 'clsx';
import styles from './styles.module.css';

const AddButton = () => {
  return (
    <div className={clsx(styles.container, styles.button)}>
      <Add sx={{fontSize: 50, color: '#333'}} />
      <div>{`Tạo lớp học mới .`}</div>
    </div>
  );
};

export default AddButton;
