import {createAsyncThunk} from '@reduxjs/toolkit';
import ClassApi from '@/api/classApi';
import {ClassModel, ClassState} from '@/models/class';
import axiosClient from '@/api/axiosClient';

const getClassById = createAsyncThunk('class/fetchClassById', async (id: string) => {
  const response = await ClassApi.findById(id);
  return response;
});

const getAllClasses = createAsyncThunk('class/getAllClasses', async () => {
  const response = await ClassApi.all();
  return response;
});

const getAllMembers = createAsyncThunk('class/getAllMembers', async (id: string) => {
  const response = await ClassApi.findAllMemberByClassId(id);
  return response;
});

const getAllCoOwners = createAsyncThunk('class/getAllCoOwners', async (id: string) => {
  const response = await ClassApi.findAllCoOwnerByClassId(id);
  return response;
});

const kickMember = createAsyncThunk('class/kickMember', async (payload: any) => {
  const URL = `/api/groups/${payload.classId}/members/${payload.uuid}`;
  const response = await axiosClient.delete(URL);
  return response;
});

const kickCoOwner = createAsyncThunk('class/kickMember', async (payload: any) => {
  const URL = `/api/groups/${payload.classId}/co-owners/${payload.uuid}`;
  const response = await axiosClient.delete(URL);
  return response;
});

const setCoOwner = createAsyncThunk('class/setCoOwner', async (payload: any) => {
  const URL = `/api/groups/${payload.classId}/co-owners`;
  const data = Array(1).fill(payload.uuid);
  const response = await axiosClient.post(URL, data);
  return response;
});

export const classExtraReducers = (builder: any) => {
  builder
    .addCase(getClassById.pending, (state: ClassState) => {
      state.status = 'loading';
    })
    .addCase(getClassById.fulfilled, (state: ClassState, action: any) => {
      state.status = 'idle';
    })
    .addCase(getClassById.rejected, (state: ClassState) => {
      state.status = 'failed';
    })
    .addCase(getAllMembers.pending, (state: ClassState) => {
      state.status = 'loading';
    })
    .addCase(getAllMembers.fulfilled, (state: ClassState, action: any) => {
      state.status = 'idle';
    })
    .addCase(getAllMembers.rejected, (state: ClassState) => {
      state.status = 'failed';
    })
    .addCase(getAllCoOwners.pending, (state: ClassState) => {
      state.status = 'loading';
    })
    .addCase(getAllCoOwners.fulfilled, (state: ClassState, action: any) => {
      state.status = 'idle';
    })
    .addCase(getAllCoOwners.rejected, (state: ClassState) => {
      state.status = 'failed';
    });
};

const ClassThunks = {
  getClassById,
  getAllClasses,
  getAllMembers,
  getAllCoOwners,
  // addClass,
  kickMember,
  setCoOwner,
  kickCoOwner,
};

export default ClassThunks;
