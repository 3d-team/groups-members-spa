import {createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import PresentationApi from '@/api/presentationApi';
import {PresentationModel, PresentationState, MultipleChoiceModel} from '@/models/presentation';
import axiosClient from '@/api/axiosClient';

const getPresentationById = createAsyncThunk('Presentation/fetchPresentationById', async (id: string) => {
  const response = await PresentationApi.findById(id);
  return response;
});

const getAllPresentations = createAsyncThunk('Presentation/getAllPresentations', async () => {
  const response = await PresentationApi.all();
  return response;
});

const getAllSlides = createAsyncThunk('Presentation/getAllSlides', async (id: string) => {
  const response = await PresentationApi.findAllSlideByPresentationId(id);
  return response;
});

// const addPresentation = createAsyncThunk('Presentation/addPresentation', async (data: any) => {
//   const response = await PresentationApi.addPresentation(data);
//   return response;
// });

const saveAllSlides = createAsyncThunk('Presentation/saveAllSlides', async (payload: any) => {
  const response = await PresentationApi.updateSlides(payload.id, payload.slides);
  return payload.slides;
});

const deletePresentation = createAsyncThunk('Presentation/deletePresentation', async (payload: {presentationId: string}) => {
  console.log('@DUKE___createAsyncThunk_deletePresentation: ', payload.presentationId);
  const response = await PresentationApi.delete(payload.presentationId)
  console.log('@DUKE___Delete Response: ', response);
  
  return payload.presentationId;
});

export const PresentationExtraReducers = (builder: any) => {
  builder
    .addCase(getPresentationById.pending, (state: PresentationState) => {
      state.status = 'loading';
    })
    .addCase(getPresentationById.fulfilled, (state: PresentationState, action: any) => {
      state.status = 'idle';
    })
    .addCase(getPresentationById.rejected, (state: PresentationState) => {
      state.status = 'failed';
    })
    .addCase(getAllPresentations.pending, (state: PresentationState) => {
      state.status = 'loading';
    })
    .addCase(getAllPresentations.fulfilled, (state: PresentationState, action: any) => {
      state.status = 'idle';
    })
    .addCase(getAllPresentations.rejected, (state: PresentationState) => {
      state.status = 'failed';
    })
    .addCase(getAllSlides.pending, (state: PresentationState) => {
      state.status = 'loading';
    })
    .addCase(getAllSlides.fulfilled, (state: PresentationState, action: any) => {
      state.status = 'idle';
    })
    .addCase(getAllSlides.rejected, (state: PresentationState) => {
      state.status = 'failed';
    })
    .addCase(saveAllSlides.fulfilled, (state: PresentationState, action: PayloadAction<MultipleChoiceModel[]>) => {
      state.data.slides = action.payload;
    })
    .addCase(deletePresentation.fulfilled, (state: PresentationState, action: PayloadAction<any>) => {
      state.presentationList = state.presentationList.filter(item => item.uuid !== action.payload);
    });
};

const PresentationThunks = {
  getPresentationById,
  getAllPresentations,
  getAllSlides,
  saveAllSlides,
  deletePresentation,
};

export default PresentationThunks;
