import {showDialog} from '../index.props';
import styles from './styles.module.css';

export default function PresentationOptions() {
  const open = () => {
    showDialog('create_new_presentation');
  };
  return (
    <div>
      <div className={styles.buttonOption} onClick={open}>
        Tạo mới
      </div>
    </div>
  );
}
