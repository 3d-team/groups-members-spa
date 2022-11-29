import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 1,
    color: 'black',
  },
  title1: {
    fontSize: '1.38rem',
    marginLeft: '5px',
    cursor: 'pointer',
  },
  title2: {
    fontSize: '0.38rem',
  },
  appBar: {
    backgroundColor: 'white',
    color: 'black',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  headerClass: {
    position: 'relative',
  },
  header__wrapper__right: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginRight: '15px',
    color: '#5f6368',
    cursor: 'pointer',
  },
  optionsCtn: {
    backgroundColor: '#ccc',
    padding: 1,
    position: 'absolute',
    right: 0,
    zIndex: 100,
    width: 100,
  },
  option: {
    color: '#000',
    padding: 12,
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#ccc',
    },
    textAlign: 'center'
  },
});
