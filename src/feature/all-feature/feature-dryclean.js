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
    updateDryClean: (state, action) => {
      const newDate = state.data.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item
        }
      });

      return {
        ...state,
        data: [...newDate],
      };
    },
  },
});

export const {
  setDryCleanOrder,
  addElementRealTime,
  concatDryCleanOrder,
  updateDryClean,
} = DryCleanOrderSlice.actions;
export default DryCleanOrderSlice;
