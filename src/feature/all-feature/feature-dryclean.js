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
    updateDryClean: (state, action) => {
      const newData = state.data.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        data: newData,
      };
    },
  },
});

export const {setDryClean, concatDryClean, updateDryClean} =
  DryCleanOrderSlice.actions;
export default DryCleanOrderSlice;
