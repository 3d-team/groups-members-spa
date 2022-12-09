import Navbar from '@/components/Navbar/Navbar';
import { ClassModel } from '@/models/class';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { useAppDispatch } from '@/redux';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./style.css";

import ClassThunks from '@/redux/feature/class/thunk';
import { useEffect } from 'react';

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
        uuid: '',
        name: '',
        ownerId: '',
        subject: '',
        description: '',
        coOwnerIds: [],
        memberIds: [],
        room: '',
        section: ''
    }

    const dispatcher = useAppDispatch();
    const [classData, setClassData] = useState<any>(sampleData);
    const [members, setMembers] = useState<any>([]);
    const [coOwners, setCoOwners] = useState<any>([]);
    const { classId } = useParams();

    async function fetchClassInfo() {
        const id: string = classId ? classId : "";
        const response = await dispatcher(ClassThunks.getClassById(id));
        console.log("Class Information: ", response.payload);
        setClassData(response.payload);

        const membersResponse = await dispatcher(ClassThunks.getAllMembers(id));
        console.log("Memebers: ", membersResponse.payload);
        setMembers(membersResponse.payload);

        const coOwnersResponse = await dispatcher(ClassThunks.getAllCoOwners(id));
        console.log("Co-Owners: ", coOwnersResponse.payload);
        setCoOwners(coOwnersResponse.payload);
      }
      
    useEffect(() => {
        fetchClassInfo();
    }, []);

    const handleSetCoOwner = async (uuid: any) => {
        handleClose();
        const payload = {
            classId: classId,
            uuid: uuid
        }
        const response = await dispatcher(ClassThunks.setCoOwner(payload));
        console.log(response);
    }

    const handleKick = async (uuid: string) => {
        handleClose();
        const payload = {
            classId: classId,
            uuid: uuid
        }
        console.log(payload);
        const response = await dispatcher(ClassThunks.kickMember(payload));
        console.log(response);
    }

    const handleKickCoOwner = async (uuid: string) => {
        handleClose();
        const payload = {
            classId: classId,
            uuid: uuid
        }
        const response = await dispatcher(ClassThunks.kickCoOwner(payload));
        console.log(response);
    }

    return (
        <>
            <Navbar classData={classData} />

            <div className="room-member__container">
                <div>
                    <div className="room-member__students">
                        <p className='room-member__title'>Giáo viên</p>
                        <div className='room-member__students--count'> {coOwners.length} giáo viên</div>
                    </div>
                    <div className="room-member__list">
                        {coOwners.length === 0 ? (<div>No any co-owners!</div>) : (
                            coOwners.map((coOwner: any) => (
                                <div className='card-student' key={coOwner.uuid}>
                                    <div className='card-student__left'>
                                        <Avatar />
                                        <span>{coOwner.fullName}</span>
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
                                            <MenuItem onClick={() => handleKickCoOwner(coOwner.uuid)} disableRipple>
                                                Kick
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div>
                    <div className="room-member__students">
                        <p className='room-member__title'>Học sinh</p>
                        <div className='room-member__students--count'> {members.length} học sinh</div>
                    </div>
                    <div className="room-member__list">
                        {members.length === 0 ? (<div>No any member!</div>) : (
                            members.map((member: any) => (
                                <div className='card-student' key={member.uuid}>
                                    <div className='card-student__left'>
                                        <Avatar />
                                        <span>{member.fullName}</span>
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
                                            <MenuItem onClick={() => handleSetCoOwner(member.uuid)} disableRipple>
                                                Set co-owner
                                            </MenuItem>
                                            <MenuItem onClick={() => handleKick(member.uuid)} disableRipple>
                                                Kick
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            
        </>
    );
}
