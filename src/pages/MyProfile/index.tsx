import Navbar from '@/components/Navbar/Navbar';
import {UserModel} from '@/models/user';
import {useAppDispatch, useAppSelector} from '@/redux';
import {UserActions} from '@/redux/feature/user/slice';
import {Box, Button, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {useEffect, useMemo, useState} from 'react';

import {useStyles} from './styles';

const MyProfile = () => {
  const classes = useStyles();
  const {data} = useAppSelector(state => state.user);
  const dispatcher = useAppDispatch();

  const [formData, setFormData] = useState<UserModel>(data);
  const [editting, setEditting] = useState<boolean>(false);

  const initialValues: UserModel = useMemo(() => {
    return data;
  }, []);

  const formik = useFormik<UserModel>({
    initialValues,
    onSubmit: values => {
      formik.setValues(values);
      dispatcher(UserActions.updateProfileUser(values));
      console.log('@DUKE_Submit', formik.values.name);
      setEditting(false);
    },
  });
  console.log('@DUKE_Submit', formik.values.name);

  return (
    <>
      <Navbar />
      <div className={classes.root}>
        <Box
          sx={{
            marginTop: 8,
          }}>
          <div className={classes.buttonCtn}>
            {editting ? (
              <>
                <Button type="submit" variant="contained" sx={{mr: 2}} onClick={() => formik.handleSubmit()}>
                  Submit
                </Button>
                <Button type="button" variant="outlined" onClick={() => setEditting(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button type="button" variant="contained" onClick={() => setEditting(true)}>
                Edit
              </Button>
            )}
          </div>
          <TextField
            id="outlined-basic"
            label="Student Id"
            disabled={!editting}
            defaultValue={data.mssv}
            sx={{m: 2, width: '70%'}}
            onChange={formik.handleChange}
            value={formik.values.mssv}
            name="mssv"
          />
          <TextField
            id="outlined-basic"
            label="Fullname"
            disabled={!editting}
            defaultValue={data.name}
            sx={{m: 2, width: '70%'}}
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
          />
          <TextField
            id="outlined-basic"
            label="Email"
            disabled={!editting}
            defaultValue={data.email}
            sx={{m: 2, width: '70%'}}
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
          />
          <TextField
            id="outlined-basic"
            label="Age"
            disabled={!editting}
            defaultValue={data.age}
            sx={{m: 2, width: '70%'}}
            onChange={formik.handleChange}
            value={formik.values.age}
            name="age"
          />
          <TextField
            id="outlined-basic"
            label="Day of birth"
            disabled={!editting}
            defaultValue={data.dob}
            sx={{m: 2, width: '70%'}}
            onChange={formik.handleChange}
            value={formik.values.dob}
            name="dob"
          />
        </Box>
      </div>
    </>
  );
};

export default MyProfile;