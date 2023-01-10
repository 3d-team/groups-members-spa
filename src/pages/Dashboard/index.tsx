import {useEffect, useState} from 'react';
import Navbar from '@/components/Navbar/Navbar';
import ClassCard from '@/components/ClassCard/ClassCard';
import Grid from '@mui/material/Grid';

import {AppDispatch} from '@/redux/store';
import {useDispatch} from 'react-redux';
import ClassThunks from '@/redux/feature/class/thunk';
import CenterContainer from '@/components/CenterContainer';
import {useAppSelector} from '@/redux';
import ClassApi from '@/api/classApi';
import {ClassActions} from '@/redux/feature/class/slice';
import {CircularProgress} from '@mui/material';

export default function Dashboard() {
  const dispatcher = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchClasses = async () => {
    const response = await ClassApi.all();
    console.log(response);
    dispatcher(ClassActions.setClassList(response));
    setLoading(false);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const classes = useAppSelector(state => state.class.classList);

  if (loading) {
    return (
      <CenterContainer>
        <CircularProgress />
      </CenterContainer>
    );
  }

  return (
    <>
      {classes.length === 0 ? (
        <CenterContainer>
          <div>No classes found! Join or create one!</div>
        </CenterContainer>
      ) : (
        <Grid container direction="row" justifyContent="flex-start" alignItems="center" px={5} py={2}>
          {classes.map((item: any, index: number) => (
            <div key={index}>
              <ClassCard 
                  creatorId={item.ownerId} 
                  name={item.name} 
                  subjectName={item.subject} 
                  uuid={item.uuid} />
            </div>
          ))}
        </Grid>
      )}
    </>
  );
}
