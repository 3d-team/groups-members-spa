import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserModel, UserState} from '@/models/user';
import {userExtraReducers} from './thunk';

const initialState: UserState = {
  data: {uuid: '', fullName: '', studentId: '', email: '', age: 0, dob: ''},
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.data.fullName = action.payload;
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
