import {useEffect, useState} from 'react';
import Navbar from '@/components/Navbar/Navbar';
import ClassCard from '@/components/ClassCard/ClassCard';
import {ClassModel} from '@/models/class';
import Grid from '@mui/material/Grid';
import axios from 'axios';

import AppState, { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import ClassThunks from '@/redux/feature/class/thunk';

export default function Dashboard() {
  const dispatcher = useDispatch<AppDispatch>();
  const [classes, setClasses] = useState<any>([]);
    
  useEffect(() => {
    async function fetchClasses() {
      const response = await dispatcher(ClassThunks.getAllClasses());
      const data = [...new Array(response.payload)];
      setClasses(response.payload);
      console.log(classes);
    };
    
    fetchClasses();
  }, [classes.length]);

  return (
    <>
      <Navbar />

      {classes.length === 0 ? (<div>No classes found! Join or create one!</div>) : (
        <Grid container direction="row" justifyContent="flex-start" alignItems="center" px={5} py={2}>
          {classes.map((c: any) => (
            <div key={c.uuid}><ClassCard
              creatorName={c.ownerId}
              name={c.name}
              subjectName={c.subject}
              uuid={c.uuid}
            /></div>
          ))}
        </Grid>
      )}
    </>
  );
}
