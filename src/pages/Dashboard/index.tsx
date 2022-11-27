import { useState } from 'react';
import Drawer from '@/components/Drawer/Drawer';
import ClassCard from '@/components/ClassCard/ClassCard';
import { ClassModel } from '@/models/class';
import Grid from "@mui/material/Grid";


export default function Dashboard() {
  const [classes, setClasses] = useState<ClassModel[]>([]);

  //Get class

  return (
    <>
      <Drawer />
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
              name={individualClass.name}
              subjectName={individualClass.subjectName}
              id={individualClass.id}
            />
          ))}
        </Grid>
      )}
    </>
  );
}
