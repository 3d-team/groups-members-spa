import {useNavigate} from 'react-router-dom';
import styles from './styles.module.css';
import clsx from 'clsx';

type Props = {
  name: string;
  creatorName: string;
  subjectName: string;
  uuid: string;
};

function ClassCard({name, creatorName, subjectName, uuid}: Props) {
  const navigate = useNavigate();

  const goToClass = () => {
    navigate(`/class/${uuid}`);
  };

  return (
    <div className={styles.container} key={uuid}>
      <div>
        <div className={styles.image}></div>
        <div className={styles.name}>{name}</div>
        <div className={clsx(styles.creatorName, styles.desc)}>{`Người tạo: ${creatorName}`}</div>
        <div className={styles.desc}>{`Mô tả: Đây là lớp học thiết kế ui/ux cho người mới bắt đầu...`}</div>
      </div>

      <div className={styles.button} onClick={goToClass}>
        Xem chi tiết
      </div>
    </div>
  );
}

export default ClassCard;
