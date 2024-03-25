import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  hasMore: null,
};

const DryCleanSlice = createSlice({
  name: 'dryclean',
  initialState: initialState,
  reducers: {
    setDryClean: (state, action) => {
      return {hasMore: action.payload.hasMore, data: action.payload.data};
    },
    updateDryClean: (state, action) => {
      const newArr = state.map(item => {
        if (item.key != action.payload.key) {
          return item;
        } else {
          return action.payload;
        }
      });

      return {...state, data: newArr};
    },
    deleteDryClean: (state, action) => {
      return {
        ...state,
        data: state.filter(item => item.key != action.payload.key),
      };
    },

    concatDryClean: (state, action) => {
      return {
        hasMore: action.payload.hasMore,
        data: [...state.data, ...action.payload.data],
      };
    },
  },
});

export const {setDryClean, updateDryClean, deleteDryClean, concatDryClean} =
  DryCleanSlice.actions;
export default DryCleanSlice;
