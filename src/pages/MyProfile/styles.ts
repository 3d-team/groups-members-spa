import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 64,
  },
  buttonCtn: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginVertical: 16,
    padding: 10,
    width: '70%',
  },
});
