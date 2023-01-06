import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import styles from './styles.module.css';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClassThunks from '@/redux/feature/class/thunk';
import clsx from 'clsx';
import ClassApi from '@/api/classApi';

type Props = {
  name: string;
  creatorName: string;
  subjectName: string;
  uuid: string;
};

function ClassCard({ name, creatorName, subjectName, uuid }: Props) {
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
    handleClose();
    const payload = {
        uuid: uuid
    }
    ClassApi.deleteClass(uuid);
    //const response = await dispatcher(ClassThunks.);
    //console.log(response);
}

  return (
    <div className={styles.container} key={uuid}>
      <div>
        <div className={styles.image}></div>
        <div className={styles.more}>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
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
        <div className={styles.name}>{name}</div>
        <div className={clsx(styles.creatorName, styles.desc)}>{`Người tạo: ${creatorName}`}</div>
        <div className={styles.desc}>{`Môn: ${subjectName}`}</div>
      </div>

      <div className={styles.button} onClick={goToClass}>
        Xem chi tiết
      </div>
    </div>
  );
}

export default ClassCard;
