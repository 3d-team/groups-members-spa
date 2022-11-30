import {useEffect, useState} from 'react';
import Navbar from '@/components/Navbar/Navbar';
import ClassCard from '@/components/ClassCard/ClassCard';
import {ClassModel} from '@/models/class';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import AppState from '@/redux/store';

export default function Dashboard() {
  const [classes, setClasses] = useState<ClassModel[]>([]);

  const state = AppState.store.getState();
  const token = state.auth.token;
  console.log(token);
  axios.get('http://localhost:8080/api/groups', { 
    headers:{
      Authorization : `Bearer ${token}`
    } 
    }).then(console.log).catch(console.log);

  return (
    <>
      <Navbar />
      {classes.length !== 0 ? (
        <div>No classes found! Join or create one!</div>
      ) : (
        <Grid container direction="row" justifyContent="flex-start" alignItems="center" px={5} py={2}>
          {classes.map(individualClass => (
            <ClassCard
              creatorName={individualClass.creatorName}
              name={individualClass.className}
              subjectName={individualClass.subjectName}
              id={individualClass.id}
            />
          ))}
        </Grid>
      )}

      <Grid container direction="row" justifyContent="flex-start" alignItems="center" px={5}>
        <ClassCard creatorName="Test" name="Test" subjectName="Test" id="12" />
      </Grid>
    </>
  );
}
