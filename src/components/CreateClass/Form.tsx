import { Button, DialogActions, TextField } from "@mui/material";
import React, { useState } from "react";
import {dialogActions} from '@/redux/feature/dialog/slice';

const Form = () => {
  const [className, setClassName] = useState("");
  const [Section, setSection] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const addClass = () => {

    //Call backend
    //dialogActions.closeCreateClassDialog();
  };

  return (
    <div className="form">
      <p className="class__title">Create Class</p>

      <div className="form__inputs">
        <TextField
          id="filled-basic"
          label="Class Name (required)"
          className="form__input"
          variant="filled"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Section"
          className="form__input"
          variant="filled"
          value={Section}
          onChange={(e) => setSection(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Subject"
          className="form__input"
          variant="filled"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
      </div>
      <DialogActions>
        <Button onClick={addClass} color="primary">
          Create
        </Button>
      </DialogActions>
    </div>
  );
};

export default Form;