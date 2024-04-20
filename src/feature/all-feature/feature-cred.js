import {createSlice} from '@reduxjs/toolkit';

const initialState = {

};

const CredSlice = createSlice({
  name: 'cred',
  initialState: {},
  reducers: {
    setCred: (state, action) => {
      return action.payload;
    },
    clearCred: (state, action) => {
      return initialState;
    },
  },
});

export const {setCred, clearCred} = CredSlice.actions;
export default CredSlice;
