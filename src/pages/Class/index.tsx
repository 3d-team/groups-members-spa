import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import { ClassModel } from '@/models/class';
import { useEffect, useRef, useState } from 'react';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import { ChevronLeft } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import { useAppDispatch } from '@/redux';
import { dialogActions } from '@/redux/feature/dialog/slice';
import InvitationDialog from '@/components/InvitationDialog/InvitationDialog';
import './style.css';
import ClassThunks from '@/redux/feature/class/thunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DialogRef } from '@/components/models';
import Header from '@/components/Header/Header';

export default function Class() {
  const sampleData: ClassModel = {
    uuid: '12',
    name: '19PTUDWNC',
    ownerId: 'Nguyen Huy Khanh',
    subject: 'Phát triển ứng dụng web nâng cao',
    description: '',
    coOwnerIds: [],
    memberIds: [],
    room: '',
    section: '',
  };
  const dialogRef = useRef<DialogRef>(null);

  const navigate = useNavigate();
  const dispatcher = useAppDispatch();
  const [classData, setClassData] = useState<any>(sampleData);
  const { classId } = useParams();

  async function fetchClassInfo() {
    const id: string = classId ? classId : '';
    const response = await dispatcher(ClassThunks.getClassById(id));
    console.log(response.payload);
    setClassData(response.payload);
  }

  // useEffect(() => {
  //   fetchClassInfo();
  // }, []);

  const handleClickInvite = () => {
    dialogRef.current?.show();
  };

  const copyInviteLink = () => { };

  return (
    <>
      <div className="main">
        <Header classData={classData}/>
        <div className="main__wrapper">
          <div className="main__content">
            <div className="main__wrapper1">
              <div className="main__bgImage">
                <div className="main__emptyStyles" />
              </div>
              <div className="main__text">
                <h1 className="main__heading main__overflow">{classData?.name}</h1>
                <div className="main__section main__overflow">{classData?.subject}</div>
                <div className="main__wrapper2">
                  <em className="main__code">* Class Code</em>
                  <div className="main__id">{classData?.uuid}</div>
                </div>
                <div className="main__buttons">
                  <Button variant="contained" size="small" color="success" onClick={handleClickInvite}>
                    Invite
                  </Button>
                  <IconButton aria-label="copy link" onClick={copyInviteLink}>
                    <LinkIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
          <div className="main__announce">
            <div className="main__status">
              <p>Upcoming</p>
              <p className="main__subText">No work due</p>
            </div>
            <div className="main__announcements">
              <div className="main__announcementsWrapper">
                <div className="main__ancContent">
                  <div className="main__wrapper100">
                    <Avatar />
                    <div>Announce Something to class</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InvitationDialog ref={dialogRef} />
      </div>
    </>
  );
}
