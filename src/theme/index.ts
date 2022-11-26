import {createTheme} from '@mui/material/styles';
import * as Colors from '@mui/material/colors';
const theme = createTheme({
  palette: {
    primary: {
      main: Colors.orange[900],
    },
    secondary: {
      main: Colors.orange[50],
    },
    // common
  },
});

export default theme;
