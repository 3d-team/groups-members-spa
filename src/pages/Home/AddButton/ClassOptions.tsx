import styles from './styles.module.css';
import {showDialog} from '../index.props';

export default function ClassOptions() {
  const onClickCreateClass = () => {
    showDialog('create_new_class');
  };
  const onClickJoinClass = () => {
    showDialog('join_class');
  };
  return (
    <div>
      <div className={styles.buttonOption} onClick={onClickCreateClass} >Tạo mới</div>
      <div className={styles.buttonOption} onClick={onClickJoinClass} >Tham gia</div>
    </div>
  );
}
