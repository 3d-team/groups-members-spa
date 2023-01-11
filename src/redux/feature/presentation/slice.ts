import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MOCK_PRESENTATION_MODEL, PresentationState} from '@/models/presentation';
import {PresentationExtraReducers} from './thunk';

const initialState: PresentationState = {
  data: MOCK_PRESENTATION_MODEL,
  status: 'idle',
  presentationList: [{}],
};

export const PresentationSlice = createSlice({
  name: 'presentation',
  initialState,
  reducers: {
    setpresentationName: (state, action: PayloadAction<string>) => {
      state.data.name = action.payload;
    },
    setOwnerId: (state, action: PayloadAction<string>) => {
      state.data.hostId = action.payload;
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
    // deletePresentation: (state, action: PayloadAction<number>) => {
    //   state.presentationList = state.presentationList.filter((item, index)=> index !== action.payload)
    // }
  },

  extraReducers: PresentationExtraReducers,
});

export const PresentationActions = PresentationSlice.actions;
const presentationReducer = PresentationSlice.reducer;
export default presentationReducer;
