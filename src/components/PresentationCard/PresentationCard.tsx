import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useAppDispatch} from '@/redux';
import styles from './styles.module.css';
import clsx from 'clsx';
import UserApi from '@/api/userApi';

type Props = {
  name: string;
  numberSlide: number;
  hostId: string;
  createdTime: string;
  modifiedTime: string;
  uuid: string;
};

function PresentationCard({name, numberSlide, hostId, createdTime, modifiedTime, uuid}: Props) {
  const navigate = useNavigate();
  const dispatcher = useAppDispatch();

  const [host, setHost] = useState<any>({});

  const goToPresentationDetail = () => {
    navigate(`/presentation/${uuid}`);
  };

  const deletePresentation = () => {};

  const presentSlides = () => {};

  const fetchHostInfo = async () => {
    if (!hostId) {
      console.log(hostId);
      return;
    }
    const host = await UserApi.getUserById(hostId);
    setHost(host);
    console.log(host);
  };

  useEffect(() => {
    fetchHostInfo();
  }, []);

  return (
    <div className={styles.container} key={uuid}>
      <div>
        <div className={styles.image}></div>
        <div className={styles.name}>{name}</div>
        <div className={clsx(styles.creatorName, styles.desc)}>{`Người tạo: ${host.fullName}`}</div>
        <div className={styles.desc}>{`Thời gian tạo: ${new Date(createdTime).toLocaleDateString('en-US')}`}</div>
      </div>

      <div className={styles.button} onClick={goToPresentationDetail}>
        Xem chi tiết
      </div>
    </div>
  );
}

export default PresentationCard;
