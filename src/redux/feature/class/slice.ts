import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ClassState} from '@/models/class';
import { classExtraReducers } from './thunk';

const initialState: ClassState = {
  data: { id: '1', className: 'PTUDWNC19', creatorName: 'Nguyen Van A', subjectName: 'Phát triển ứng dụng web nâng cao'},
  status: 'idle',
};

export const classSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setClassName: (state, action: PayloadAction<string>) => {
      state.data.className = action.payload;
    },
    setCreatorName: (state, action: PayloadAction<string>) => {
      state.data.creatorName = action.payload;
    },
    setSubjectName: (state, action: PayloadAction<string>) => {
      state.data.subjectName = action.payload;
    },
  },

  extraReducers: classExtraReducers
});

export const ClassActions = classSlice.actions;
const classReducer = classSlice.reducer;
export default classReducer;
