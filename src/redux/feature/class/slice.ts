import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ClassState} from '@/models/class';
import {classExtraReducers} from './thunk';

const initialState: ClassState = {
  data: {
    uuid: '',
    name: '',
    ownerId: '',
    subject: '',
    description: '',
    coOwnerIds: [],
    memberIds: [],
    room: '',
    section: ''
  },
  status: 'idle',
};

export const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    setClassName: (state, action: PayloadAction<string>) => {
      state.data.name = action.payload;
    },
    setOwnerId: (state, action: PayloadAction<string>) => {
      state.data.ownerId = action.payload;
    },
    setSubjectName: (state, action: PayloadAction<string>) => {
      state.data.subject = action.payload;
    },
  },

  extraReducers: classExtraReducers,
});

export const ClassActions = classSlice.actions;
const classReducer = classSlice.reducer;
export default classReducer;
