import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClassThunks from '@/redux/feature/class/thunk';
import clsx from 'clsx';

import ClassApi from '@/api/classApi';
import { useAppSelector } from '@/redux';
import UserApi from '@/api/userApi';

type Props = {
  name: string;
  creatorId: string;
  subjectName: string;
  uuid: string;
};

function ClassCard({ name, creatorId, subjectName, uuid }: Props) {
  const loggedUser = useAppSelector(state => state.user.data);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };
  const navigate = useNavigate();

  const goToClass = () => {
    navigate(`/class/${uuid}`);
  };

  const handleDeleteClass = async (uuid: string) => {
    console.log("Trigger delete class.");
    handleClose();

    if (creatorId != loggedUser.uuid) {
      alert("You don't own this class");
      return;
    }
    
    const payload = {
        uuid: uuid
    }
    ClassApi.deleteClass(uuid);
    //const response = await dispatcher(ClassThunks.);
    //console.log(response);
  }

  const [creator, setCreator] = useState<any>({
    uuid: "",
    fullName: "",
    email: "",
    age: "",
    dob: "",
  });
  const fetchCreator = async () => {
    const response = await UserApi.getUserById(creatorId);
    console.log(response);
    setCreator(response);
  };
  useEffect(() => {
    fetchCreator();
  }, []);

  return (
    <div className={styles.container} key={uuid}>
      <div>
        <div className={styles.image}></div>
        {(creatorId == loggedUser.uuid) && 
          <div className={styles.more}>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleDeleteClass(uuid)} disableRipple>
                  Delete
                </MenuItem>
              </Menu>
          </div>
        }
        <div className={styles.name}>{name}</div>
        <div className={clsx(styles.creatorName, styles.desc)}>{`Người tạo: ${creator.fullName}`}</div>
        <div className={styles.desc}>{`Môn: ${subjectName}`}</div>
      </div>

      <div className={styles.button} onClick={goToClass}>
        Xem chi tiết
      </div>
    </div>
  );
}

export default ClassCard;
