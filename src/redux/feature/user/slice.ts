import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserModel, UserState} from '@/models/user';
import {userExtraReducers} from './thunk';

const initialState: UserState = {
  data: {id: '1', name: 'Tram Huu Duc', mssv: '19120484', email: 'thduc@gmail.com', age: 21, dob: '20-11-2000'},
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.data.name = action.payload;
    },
    setAge: (state, action: PayloadAction<number>) => {
      state.data.age = action.payload;
    },
    setDob: (state, action: PayloadAction<string>) => {
      state.data.dob = action.payload;
    },
    updateProfileUser: (state, action: PayloadAction<UserModel>) => {
      state.data = action.payload;
    },
  },

  extraReducers: userExtraReducers,
});

export const UserActions = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
