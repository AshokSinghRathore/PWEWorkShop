import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  lastElement: null,
  firstFetched: true,
};

const IroningOrderSlice = createSlice({
  name: 'Ironing Reducer',
  initialState: initialState,
  reducers: {
    setIroningOrder: (state, action) => {
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
    concatIroningOrder: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    addElementRealTimeIroning: (state, action) => {
      return {
        ...state,
        data: [...action.payload, ...state.data],
      };
    },
    updateIroning: (state, action) => {
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
  setIroningOrder,
  addElementRealTimeIroning,
  concatIroningOrder,
  updateIroning,
} = IroningOrderSlice.actions;
export default IroningOrderSlice;
