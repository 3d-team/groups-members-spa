import Navbar from '@/components/Navbar/Navbar';
import {useAppDispatch, useAppSelector} from '@/redux';
import {UserActions} from '@/redux/feature/user/slice';
import {Button, TextField} from '@mui/material';
import {useEffect, useState} from 'react';

import {useStyles} from './styles';

const MyProfile = () => {
  const classes = useStyles();
  const {data} = useAppSelector(state => state.user);
  const dispatcher = useAppDispatch();
  console.log('@DUKE__', data.email);

  const [editting, setEditting] = useState<boolean>(false);

  useEffect(() => {
    dispatcher(UserActions.updateProfileUser({id: '1', name: 'Tra Duc', mssv: '19120484', email: 'thduc@gmail.com', age: 21, dob: '20-11-2000'}));
  }, []);

  return (
    <>
      <Navbar />
      <div className={classes.root}>
        <div className={classes.buttonCtn}>
          {editting ? (
            <>
              <Button variant="contained" sx={{mr: 2}}>
                Submit
              </Button>
              <Button variant="outlined" onClick={() => setEditting(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={() => setEditting(true)}>
              Edit
            </Button>
          )}
        </div>
        <TextField id="outlined-basic" label="Student Id" disabled={!editting} defaultValue={data.mssv} sx={{m: 2, width: '70%'}} />
        <TextField id="outlined-basic" label="Fullname" disabled={!editting} defaultValue={data.name} sx={{m: 2, width: '70%'}} />
        <TextField id="outlined-basic" label="Email" disabled={!editting} defaultValue={data.email} sx={{m: 2, width: '70%'}} />
        <TextField id="outlined-basic" label="Age" disabled={!editting} defaultValue={data.age} sx={{m: 2, width: '70%'}} />
        <TextField id="outlined-basic" label="Day of birth" disabled={!editting} defaultValue={data.dob} sx={{m: 2, width: '70%'}} />
      </div>
    </>
  );
};

export default MyProfile;
