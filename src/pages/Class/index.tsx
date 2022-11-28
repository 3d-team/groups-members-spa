import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import { ClassModel } from '@/models/class';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import { useAppDispatch } from '@/redux';
import { dialogActions } from '@/redux/feature/dialog/slice';
import InvitationDialog from '@/components/InvitationDialog/InvitationDialog';
import "./style.css";

export default function Class() {

  const sampleData: ClassModel = {
    id: '12',
    className: '19PTUDWNC',
    creatorName: 'Nguyen Huy Khanh',
    subjectName: 'Phát triển ứng dụng web nâng cao',
  }

  const dispatcher = useAppDispatch();
  const [classData, setClassData] = useState<ClassModel>(sampleData);
  const { classId } = useParams();

  //Get Class 

  const handleClickInvite = () => {
    dispatcher(dialogActions.openInviteDialog());
  };

  const copyInviteLink = () =>{
    //bla bla 
  }

  return (
    <>
      <Navbar classData={classData} />
      <div className="main">
        <div className="main__wrapper">
          <div className="main__content">
            <div className="main__wrapper1">
              <div className="main__bgImage">
                <div className="main__emptyStyles" />
              </div>
              <div className="main__text">
                <h1 className="main__heading main__overflow">
                  {classData?.className}
                </h1>
                <div className="main__section main__overflow">
                  {classData?.subjectName}
                </div>
                <div className="main__wrapper2">
                  <em className="main__code">Class Code :</em>
                  <div className="main__id">{classData?.id}</div>
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
        <InvitationDialog/>
      </div>
    </>
  );
}
