import {IconButton} from '@mui/material';
import {AssignmentIndOutlined, FolderOpenOutlined} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import './style.css';

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
    <div className="classCard" style={{marginRight: 30, marginBottom: 30}} onClick={goToClass} key={uuid}>
      <div className="classCard__upper">
        <div className="classCard__className">{name}</div>
        <div className="classCard__subjectName">{subjectName}</div>
        <div className="classCard__creatorName">{creatorName}</div>
      </div>
      <div className="classCard__middle"></div>
      <div className="classCard__lower">
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
