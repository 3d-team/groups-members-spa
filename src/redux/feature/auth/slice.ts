import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthorizeModel} from '@/models/auth';

const initialState: AuthorizeModel = {
  isLoggedIn: false,
  token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', state.token);
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    loginSucceed: state => {
      state.isLoggedIn = true;
    },
    logout: state => {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
