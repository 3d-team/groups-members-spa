import {createAsyncThunk} from '@reduxjs/toolkit';
import UserApi from '@/api/userApi';
import { UserModel, UserState } from '@/models/user';

const getUserById = createAsyncThunk('user/fetchUserById', async (id: number) => {
  const response = await UserApi.getUserById(id);
  console.log('@DUKE_getUserByIdTHUNK ', response);
  
  // The value we return becomes the `fulfilled` action payload
  return response;
});

const getUserList = createAsyncThunk('user/getUserList', async () => {
    const response = await UserApi.getAll();
    // The value we return becomes the `fulfilled` action payload
    return response;
});


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
    getUserList
}

export default UserThunks;
