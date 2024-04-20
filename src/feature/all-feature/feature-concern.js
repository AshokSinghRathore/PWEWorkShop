import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  lastElement: null,
  firstFetched: true,
};

const ConcernOrderSlice = createSlice({
  name: 'Concern Reducer',
  initialState: initialState,
  reducers: {
    setConcernOrder: (state, action) => {
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
    concatConcernOrder: (state, action) => {
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
    updateConcern: (state, action) => {
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
  setConcernOrder,
  addElementRealTime,
  concatConcernOrder,
  updateConcern,
} = ConcernOrderSlice.actions;
export default ConcernOrderSlice;
