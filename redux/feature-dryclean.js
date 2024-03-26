import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  lastElement: null,
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
    clearDryCleanOrders: state => {
      return initialState;
    },
  },
});

export const {setDryClean, concatDryClean, clearDryCleanOrders} =
  DryCleanOrderSlice.actions;
export default DryCleanOrderSlice;
