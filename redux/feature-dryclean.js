import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  lastElement: null,
  firstFetched: true,
};

const DryCleanOrderSlice = createSlice({
  name: 'DryClean Reducer',
  initialState: initialState,
  reducers: {
    setDryCleanOrder: (state, action) => {
      if (state.firstFetched) {
        // Only set firstFetched to false if it's still true
        return {
          ...action.payload,
          firstFetched: false,
        };
      } else {
        // If firstFetched is already false, return state without any changes
        return {
          ...state,
          data: [...action.payload.data, ...state.data],
        };
      }
    },
    concatDryCleanOrder: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    addElementRealTime: (state, action) => {
      return {
        ...state,
        data: [...action.payload, ...state.data],
      };
    },
    clearDryClean: state => {
      return initialState;
    },
  },
});

export const {setDryCleanOrder, addElementRealTime, concatDryCleanOrder,clearDryClean} =
  DryCleanOrderSlice.actions;
export default DryCleanOrderSlice;
