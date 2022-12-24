import {Button, Checkbox, Dialog, DialogActions, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import {useAppSelector, useAppDispatch} from '@/redux';
import {dialogActions} from '@/redux/feature/dialog/slice';
import PresentationApi from '@/api/presentationApi';
import {PresentationActions} from '@/redux/feature/presentation/slice';
import styles from './styles.module.css';

interface Props {
  hideOnSubmit: () => void;
}
const CreatePresentation = ({hideOnSubmit}: Props) => {
  const [namePresentation, setName] = useState('');
  const dispatcher = useAppDispatch();

  const createPresentation = async () => {
    const data = {
      name: namePresentation,
    };
    PresentationApi.addPresentation(data);
    dispatcher(PresentationActions.addPresentation(data));
    hideOnSubmit();
  };

  return (
    <div className={styles.container}>
      <p className="Presentation__title">Create new presentation</p>

      <div className="form__inputs">
        <TextField
          id="filled-basic"
          label="Presentation name"
          className="form__input"
          variant="filled"
          value={namePresentation}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <Button onClick={createPresentation} color="primary">
        Create presentation
      </Button>
    </div>
  );
};

export default CreatePresentation;
