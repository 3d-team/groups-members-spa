import {IconButton} from '@mui/material';
import {AssignmentIndOutlined, FolderOpenOutlined} from '@mui/icons-material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import {useNavigate} from 'react-router-dom';
import styles from './styles.module.css';
import clsx from 'clsx';

type Props = {
  name: string;
  numberSlide: number;
  ownerId: string;
  createdTime: string;
  modifiedTime: string;
  uuid: string;
};

function PresentationCard({name, numberSlide, ownerId, createdTime, modifiedTime, uuid}: Props) {
  const navigate = useNavigate();

  const goToPresentationDetail = () => {
    navigate(`/presentation/${uuid}`);
  };

  const deletePresentation = () => {};

  const presentSlides = () => {};

  return (
    <div className={styles.container} key={uuid}>
      <div>
        <div className={styles.image}></div>
        <div className={styles.name}>{name}</div>
        <div className={clsx(styles.creatorName, styles.desc)}>{`Người tạo: ${ownerId}`}</div>
        <div className={styles.desc}>{`Thời gian tạo: 24:00`}</div>
      </div>

      <div className={styles.button} onClick={goToPresentationDetail}>
        Xem chi tiết
      </div>
    </div>
  );
}

export default PresentationCard;
