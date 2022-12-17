import {IconButton} from '@mui/material';
import {AssignmentIndOutlined, FolderOpenOutlined} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import styles from './styles.module.css';

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
    <div className={styles.classCard} onClick={goToClass} key={uuid}>
      <div className={styles.classCard__upper}>
        <div className={styles.classCard__className}>{name}</div>
        <div className={styles.classCard__subjectName}>{subjectName}</div>
        <div className={styles.classCard__creatorName}>{creatorName}</div>
      </div>
      <div className={styles.classCard__middle}></div>
      <div className={styles.classCard__lower}>
        <IconButton>
          <FolderOpenOutlined />
        </IconButton>
        <IconButton>
          <AssignmentIndOutlined />
        </IconButton>
      </div>
    </div>
  );
}

export default ClassCard;
