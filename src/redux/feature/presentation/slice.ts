import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PresentationState} from '@/models/presentation';
import {PresentationExtraReducers} from './thunk';

const initialState: PresentationState = {
  data: {
    uuid: '',
    name: '',
    ownerId: '',
    accessCode: '',
    slides: [],
  },
  status: 'idle',
  presentationList: [],
};

export const PresentationSlice = createSlice({
  name: 'presentation',
  initialState,
  reducers: {
    setpresentationName: (state, action: PayloadAction<string>) => {
      state.data.name = action.payload;
    },
    setOwnerId: (state, action: PayloadAction<string>) => {
      state.data.ownerId = action.payload;
    },
    setSubjectName: (state, action: PayloadAction<string>) => {
      state.data.accessCode = action.payload;
    },
    addPresentation: (state, action: PayloadAction<any>) => {
      state.presentationList = [...state.presentationList, action.payload];
    },
    setPresentationList: (state, action: PayloadAction<any>) => {
      state.presentationList = action.payload;
    },
  },

  extraReducers: PresentationExtraReducers,
});

export const PresentationActions = PresentationSlice.actions;
const presentationReducer = PresentationSlice.reducer;
export default presentationReducer;
