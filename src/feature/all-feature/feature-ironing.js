import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  lastElement: null,
};

const IroningOrderSlice = createSlice({
  initialState: initialState,
  name: 'IroningOrder',
  reducers: {
    setIroning: (state, action) => {
      return {
        lastElement: action.payload.lastElement,
        data: action.payload.data,
        hasMore: action.payload.hasMore,
        showLoader: action.payload.showLoader,
      };
    },
    concatIroning: (state, action) => {
      return {
        lastElement: action.payload.lastElement,
        data: [...state.data, ...action.payload.data],
        hasMore: action.payload.hasMore,
      };
    },
    updateIroning: (state, action) => {
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

export const {setIroning, concatIroning, updateIroning} =
  IroningOrderSlice.actions;
export default IroningOrderSlice;
