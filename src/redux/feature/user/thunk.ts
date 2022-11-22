import {createAsyncThunk} from '@reduxjs/toolkit';
import UserApi from '@/api/userApi';

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


export const userExtraReducers = (builder: any)=>{
    builder
    .addCase(getUserById.pending, (state: any) => {
      state.status = 'loading';
    })
    .addCase(getUserById.fulfilled, (state: any, action: any) => {
      state.status = 'idle';
    })
    .addCase(getUserById.rejected, (state: any) => {
      state.status = 'failed';
    });
}

const UserThunks = {
    getUserById,
    getUserList
}

export default UserThunks;
