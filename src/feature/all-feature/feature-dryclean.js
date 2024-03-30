import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  lastElement: null,
  initialFetched: false,
};

const DryCleanOrderSlice = createSlice({
  initialState: initialState,
  name: 'DryCleanOrder',
  reducers: {
    setDryClean: (state, action) => {
      console.log('Setting Dry Clean');
      return {
        lastElement: action.payload.lastElement,
        data: action.payload.data,
        initialFetched: true,
      };
    },
    concatDryClean: (state, action) => {
      return {
        lastElement: action.payload.lastElement,
        data: [...state.data, ...action.payload.data],
        initialFetched: true,
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
        initialFetched: true,
      };
    },
    realtimeData: (state, action) => {
      console.log('real time data');
      return {
        ...state,
        data: [...action.payload, ...state.data],
        initialFetched: true,
      };
    },
  },
});

export const {setDryClean, concatDryClean, updateDryClean, realtimeData} =
  DryCleanOrderSlice.actions;
export default DryCleanOrderSlice;
