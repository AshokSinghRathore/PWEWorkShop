import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  lastElement: null
};

const DryCleanOrderSlice = createSlice({
  initialState: initialState,
  name: 'DryClean',
  reducers: {
    setDryClean: (state, action) => {
      return {
        lastElement: action.payload.lastElement,
        data: action.payload.data,
        hasMore: action.payload.hasMore,
        showLoader: action.payload.showLoader,
      };
    },
    concatDryClean: (state, action) => {
      return {
        lastElement: action.payload.lastElement,
        data: [...state.data, ...action.payload.data],
        hasMore: action.payload.hasMore,
      };
    },

    setShowLoader: (state, action) => {
      return {
        ...state,
        showLoader: action.payload,
      };
    },
  },
});

export const {setDryClean, concatDryClean} = DryCleanOrderSlice.actions;
export default DryCleanOrderSlice;
