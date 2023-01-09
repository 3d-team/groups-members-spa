import {UserModel} from '@/models/user';
import {useAppDispatch, useAppSelector} from '@/redux';
import {UserActions} from '@/redux/feature/user/slice';
import UserThunks from '@/redux/feature/user/thunk';
import {Box, Button, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {useMemo, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as Yup from 'yup';

import {useStyles} from './styles';

const MyProfile = () => {
  const classes = useStyles();
  const {data} = useAppSelector(state => state.user);
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserModel>(data);
  const [editting, setEditting] = useState<boolean>(false);

  const initialValues: UserModel = useMemo(() => {
    return data;
  }, []);

  const formik = useFormik<UserModel>({
    initialValues: initialValues,
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 20 characters")
        .required("Required!"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!"),
      studentId: Yup.string()
        .length(8, "Student ID must have 8 characters")
        .required("Required!"),
      age: Yup.number()
        .positive("age > 0").integer(),
    }),
    onSubmit: values => {
      formik.setValues(values);
      dispatcher(UserActions.updateProfileUser(values));
      dispatcher(UserThunks.updateProfile(values));
      setEditting(false);
    },
  });

  return (
    <>
      <div className={classes.root}>
        <Box
          sx={{
            marginTop: 8,
          }}>
          <div className={classes.buttonCtn}>
            {editting ? (
              <>
                <Button type="submit" variant="contained" sx={{mr: 2}} onClick={() => formik.handleSubmit()}>
                  Update
                </Button>
                <Button type="button" variant="outlined" sx={{mr: 2}}  onClick={() => setEditting(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button type="button" variant="contained" sx={{mr: 2}}  onClick={() => setEditting(true)}>
                Edit
              </Button>
            )}
            <Button type="button" variant="contained" onClick={() => navigate('/changepassword')}>
                Change Password
            </Button>
          </div>
          <TextField
            id="outlined-basic"
            label="Student Id"
            disabled={!editting}
            defaultValue={data.studentId}
            sx={{m: 2, width: '70%'}}
            onChange={formik.handleChange}
            value={formik.values.studentId}
            name="studentId"
            error = {formik.errors.studentId ? true : false}
            helperText={(formik.errors.studentId && formik.touched.studentId)? formik.errors.studentId: ''}
          />
          <TextField
            id="outlined-basic"
            label="Fullname"
            disabled={!editting}
            defaultValue={data.fullName}
            sx={{m: 2, width: '70%'}}
            onChange={formik.handleChange}
            value={formik.values.fullName}
            name="fullName"
            error = {formik.errors.fullName ? true : false}
            helperText={(formik.errors.fullName && formik.touched.fullName)? formik.errors.fullName: ''}
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
            error = {formik.errors.email ? true : false}
            helperText={(formik.errors.email && formik.touched.email)? formik.errors.email: ''}
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
            error = {formik.errors.age ? true : false}
            helperText={(formik.errors.age && formik.touched.age)? formik.errors.age: ''}
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
