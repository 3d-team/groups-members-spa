import {Button, Checkbox, Dialog, DialogActions, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import {useAppSelector, useAppDispatch} from '@/redux';
import {dialogActions} from '@/redux/feature/dialog/slice';

const CreatePresentation = () => {
  const dialog = useAppSelector(state => state.dialog.createPresentationDialog);
  const [name, setName] = useState('');
  const dispatcher = useAppDispatch();

  const handleClose = () => {
    dispatcher(dialogActions.closeCreatePresentationDialog());
  };

  const inviteEmail = () => {
    //

    dispatcher(dialogActions.closeCreatePresentationDialog());
  };

  return (
    <div>
      <Dialog onClose={() => handleClose()} aria-labelledby="customized-dialog-title" open={dialog} maxWidth="lg" className="form__dialog">
        <div className="form">
          <p className="class__title">Create new presentation</p>

          <div className="form__inputs">
            <TextField id="filled-basic" label="Presentation name" className="form__input" variant="filled" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <DialogActions>
            <Button onClick={inviteEmail} color="inherit">
              Cancel
            </Button>
            <Button onClick={inviteEmail} color="primary">
              Create presentation
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default CreatePresentation;
