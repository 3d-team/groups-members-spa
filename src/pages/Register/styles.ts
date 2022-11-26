import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(2),
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  googleBtn: {
    backgroundColor: '#fff',
    margin: theme.spacing(5, 0, 2),
  },
  facebookBtn: {
    backgroundColor: '#fff',
    margin: theme.spacing(1, 0, 2),
  },
  textBtn: {
    flex: 1,
    textTransform: 'none',
  },
}));

export default useStyles;
