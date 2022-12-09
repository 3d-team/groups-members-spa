import {createAsyncThunk} from '@reduxjs/toolkit';
import UserApi from '@/api/userApi';
import { UserState } from '@/models/user';
import axiosClient from '@/api/axiosClient';

const getUserById = createAsyncThunk('user/fetchUserById', async (id: number) => {
  const response = await UserApi.getUserById(id);
  // The value we return becomes the `fulfilled` action payload
  return response;
});

const getUserList = createAsyncThunk('user/getUserList', async () => {
    const response = await UserApi.getAll();
    // The value we return becomes the `fulfilled` action payload
    return response;
});

const getProfile = createAsyncThunk('user/getProfile', async () => {
  const URL = '/api/profile';
  const response = await axiosClient.get(URL);
  return response;
});

const updateProfile = createAsyncThunk('user/updateProfile',async (data: any) => {
  const URL = '/api/profile';
  const response = await axiosClient.post(URL, data);
  return response;
})


export const userExtraReducers = (builder: any)=>{
    builder
    .addCase(getUserById.pending, (state: UserState) => {
      state.status = 'loading';
    })
    .addCase(getUserById.fulfilled, (state: UserState, action: any) => {
      state.status = 'idle';
    })
    .addCase(getUserById.rejected, (state: UserState) => {
      state.status = 'failed';
    });
}

const UserThunks = {
    getUserById,
    getUserList,
    getProfile,
    updateProfile
}

export default UserThunks;
