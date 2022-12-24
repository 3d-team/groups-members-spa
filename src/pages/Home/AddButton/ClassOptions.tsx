import styles from './styles.module.css';

export default function ClassOptions() {
  return (
    <div>
      <div className={styles.buttonOption}>Tạo mới</div>
      <div className={styles.buttonOption}>Tham gia</div>
    </div>
  );
}
