import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    createClassDialog: false,
    joinClassDialog: false,
    inviteDialog: false,
};

export const dialogSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    openCreateClassDialog: state => {
      state.createClassDialog = true;
    },
    openJoinClassDialog: state => {
        state.joinClassDialog = true;
      },
    closeCreateClassDialog: state => {
      state.createClassDialog = false;
    },
    closeJoinClassDialog: state => {
        state.joinClassDialog = false;
      },
    openInviteDialog: state => {
        state.inviteDialog = true;
      },
    closeInviteDialog: state => {
      state.inviteDialog = false;
    },
  },
});

export const dialogActions = dialogSlice.actions;
const dialogReducer = dialogSlice.reducer;
export default dialogReducer;
