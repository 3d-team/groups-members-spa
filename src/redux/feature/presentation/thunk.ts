import {createAsyncThunk} from '@reduxjs/toolkit';
import PresentationApi from '@/api/presentationApi';
import {PresentationModel, PresentationState} from '@/models/presentation';
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
//   console.log('@DUKE)))__addPresentation respone: ', response);

//   return response;
// });

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
    });
  // .addCase(addPresentation.pending, (state: PresentationState) => {
  //   state.status = 'loading';
  // })
  // .addCase(addPresentation.fulfilled, (state: PresentationState, action: any) => {
  //   state.status = 'idle';
  //   console.log('@DUKE__action.payload', action);

  //   // state.PresentationList = [...state.PresentationList, ...action.payload];
  // })
  // .addCase(addPresentation.rejected, (state: PresentationState) => {
  //   state.status = 'loading';
  // });
};

const PresentationThunks = {
  getPresentationById,
  getAllPresentations,
  getAllSlides,
  // addPresentation,
};

export default PresentationThunks;
