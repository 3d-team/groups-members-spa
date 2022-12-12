import {IconButton} from '@mui/material';
import {AssignmentIndOutlined, FolderOpenOutlined} from '@mui/icons-material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import {useNavigate} from 'react-router-dom';
import './style.css';

type Props = {
  name: string;
  numberSlide: number;
  ownerId : string;
  createdTime: string;
  modifiedTime: string;
  uuid: string;
};

function PresentationCard({name, numberSlide, ownerId, createdTime, modifiedTime, uuid}: Props) {
  const navigate = useNavigate();

  const goToPresentationDetail = () => {
    navigate(`/presentation/${uuid}`);
  };

  const deletePresentation = () => {

  };

  const presentSlides = () => {

  };

  return (
    <div className="presentationCard" style={{marginRight: 30, marginBottom: 30}} onClick={goToPresentationDetail} key={uuid}>
      <div className="presentationCard__upper">
        <div className="presentationCard__Name">{name}</div>
        <div className="presentationCard__numberSlide">{numberSlide} {numberSlide > 1 ? "Slides" : "Slide"}</div>
        <div className="presentationCard__creatorName">{ownerId}</div>
      </div>
      <div className="presentationCard__middle">
        <div>Created: {createdTime}</div>
        <div>Modified: {modifiedTime}</div>
      </div>
      <div className="presentationCard__lower">
        <IconButton onClick={deletePresentation}>
          <DeleteOutlineIcon />
        </IconButton>
        <IconButton onClick={presentSlides} >
          <SlideshowIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default PresentationCard;
