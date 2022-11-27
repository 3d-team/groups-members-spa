import {createAsyncThunk} from '@reduxjs/toolkit';
import ClassApi from '@/api/classApi';
import { ClassState } from '@/models/class';

const getClassById = createAsyncThunk('class/fetchClassById', async (id: string) => {
  const response = await ClassApi.getClassById(id);
  // The value we return becomes the `fulfilled` action payload
  return response;
});

const getClassList = createAsyncThunk('class/getClassList', async () => {
    const response = await ClassApi.getAll();
    // The value we return becomes the `fulfilled` action payload
    return response;
});


export const classExtraReducers = (builder: any)=>{
    builder
    .addCase(getClassById.pending, (state: ClassState) => {
      state.status = 'loading';
    })
    .addCase(getClassById.fulfilled, (state: ClassState, action: any) => {
      state.status = 'idle';
    })
    .addCase(getClassById.rejected, (state: ClassState) => {
      state.status = 'failed';
    });
}

const ClassThunks = {
    getClassById,
    getClassList
}

export default ClassThunks;
