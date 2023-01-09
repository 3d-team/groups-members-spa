import {makeStyles} from '@mui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBtn: {
    flex: 1,
    textTransform: 'none',
  },
  validationMessage: {
    color: "red"
  },
}));

export default useStyles;
