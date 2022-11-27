import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import ClassCard from '@/components/ClassCard/ClassCard';
import { ClassModel } from '@/models/class';
import Grid from "@mui/material/Grid";


export default function Dashboard() {
  const [classes, setClasses] = useState<ClassModel[]>([]);

  //Get class

  return (
    <>
      <Navbar />
      {classes.length === 0 ? (
        <div>
          No classes found! Join or create one!
        </div>
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          px={5}
        >
          {classes.map((individualClass) => (
            <ClassCard
              creatorName={individualClass.creatorName}
              name={individualClass.className}
              subjectName={individualClass.subjectName}
              id={individualClass.id}
            />
          ))}
        </Grid>
      )}

    <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          px={5}
        >
            <ClassCard
              creatorName="zxczxc"
              name="zxczxc"
              subjectName="zxczxc"
              id="12"
            />
        </Grid>
    </>
  );
}
