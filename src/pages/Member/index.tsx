import Navbar from '@/components/Navbar/Navbar';
import { ClassModel } from '@/models/class';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { useAppDispatch } from '@/redux';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./style.css";

export default function Member() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const sampleData: ClassModel = {
        id: '12',
        className: '19PTUDWNC',
        creatorName: 'Nguyen Huy Khanh',
        subjectName: 'Phát triển ứng dụng web nâng cao',
    }

    const [classData, setClassData] = useState<ClassModel>(sampleData);
    const { classId } = useParams();

    //Get Class 

    const handleSetCoOwner =() => {
        handleClose();
        //Set co-owner
    }

    const handleKick = () => {
        handleClose();
        //Kick
    }

    return (
        <>
            <Navbar classData={classData} />

            <div className="room-member__container">
                <div>
                    <div className="room-member__students">
                        <p className='room-member__title'>Giáo viên</p>
                        <div className='room-member__students--count'> n giáo viên</div>
                    </div>
                    <div className="room-member__list">
                        <div className='card-student'>
                            <div className='card-student__left'>
                                <Avatar />
                                <span>Lê Văn Định</span>
                            </div>
                            <div className='card-student__right'>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="room-member__students">
                        <p className='room-member__title'>Học sinh</p>
                        <div className='room-member__students--count'> n học sinh</div>
                    </div>
                    <div className="room-member__list">
                        <div className='card-student'>
                            <div className='card-student__left'>
                                <Avatar />
                                <span>Lê Văn Định</span>
                            </div>
                            <div>
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
                                    <MenuItem onClick={handleSetCoOwner} disableRipple>
                                        Set co-owner
                                    </MenuItem>
                                    <MenuItem onClick={handleKick} disableRipple>
                                        Kick
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                        <div className='card-student'>
                            <div className='card-student__left'>
                                <Avatar />
                                <span>Lê Văn B</span>
                            </div>
                            <div>
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
                                    <MenuItem onClick={handleClose} disableRipple>
                                        Set co-owner
                                    </MenuItem>
                                    <MenuItem onClick={handleClose} disableRipple>
                                        Kick
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}
