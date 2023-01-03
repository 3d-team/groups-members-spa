import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MOCK_PRESENTATION_MODEL, PresentationModel, PresentationState} from '@/models/presentation';
import {PresentationExtraReducers} from './thunk';

const initialState: PresentationState = {
  status: 'idle',
  presentationList: [MOCK_PRESENTATION_MODEL, {...MOCK_PRESENTATION_MODEL, uuid: 'test'}],
};

export const PresentationSlice = createSlice({
  name: 'presentation',
  initialState,
  reducers: {
    addPresentation: (state, action: PayloadAction<PresentationModel>) => {
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
