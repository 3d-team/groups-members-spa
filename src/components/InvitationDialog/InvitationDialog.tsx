import {Button, Checkbox, Dialog, DialogActions, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import {useAppSelector, useAppDispatch} from '@/redux';
import {dialogActions} from '@/redux/feature/dialog/slice';
import {forwardRef, useRef, useImperativeHandle} from 'react';
import './style.css';
import {DialogRef} from '../models';

const InvitationDialog = (props: any, ref: any) => {
  const inviteDialog = useAppSelector(state => state.dialog.inviteDialog);
  const [email, setEmail] = useState('');
  const dispatcher = useAppDispatch();

  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => {
    //   dispatcher(dialogActions.closeInviteDialog());
  };

  const inviteEmail = () => {
    //Call backend
    // dispatcher(dialogActions.closeInviteDialog());
    hideDialog();
  };

  const showDialog = () => {
    setShow(true);
  };
  const hideDialog = () => {
    setShow(false);
  };

  useImperativeHandle(ref, (): DialogRef => {
    return {
      show: showDialog,
      hide: hideDialog,
    };
  });

  return (
    <div>
      <Dialog onClose={() => handleClose()} aria-labelledby="customized-dialog-title" open={show} maxWidth="lg" className="form__dialog">
        <div className="form">
          <p className="class__title">Invite group member by email</p>

          <div className="form__inputs">
            <TextField id="filled-basic" label="Email" className="form__input" variant="filled" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <DialogActions>
            <Button onClick={inviteEmail} color="primary">
              Invite
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default forwardRef(InvitationDialog);
