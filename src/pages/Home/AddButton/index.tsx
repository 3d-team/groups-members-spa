import {Add} from '@mui/icons-material';
import {NavigationOptionType} from '../index.props';
import ClassOptions from './ClassOptions';
import PresentationOptions from './PresentationOptions';
import styles from './styles.module.css';

interface Props {
  type?: NavigationOptionType;
}

const AddButton = ({type = 'classes'}: Props) => {
  const renderOptions = (key: NavigationOptionType) => {
    switch (key) {
      case 'classes':
        return <ClassOptions />;
      case 'presentation':
        return <PresentationOptions />;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.addButton}>
        <Add sx={{fontSize: 50, color: '#333'}} />
      </div>
      <div className={styles.optionsCtn}>{renderOptions(type)}</div>
    </div>
  );
};

export default AddButton;
