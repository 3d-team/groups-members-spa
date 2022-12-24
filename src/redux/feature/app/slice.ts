import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppModel} from '@/models/app';

const initialState: AppModel = {currentNavIndex: 0};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateNavIndex: (state, action: PayloadAction<number>) => {
      state.currentNavIndex = action.payload;
    },
  },
});

export const appActions = appSlice.actions;
const appReducer = appSlice.reducer;
export default appReducer;
