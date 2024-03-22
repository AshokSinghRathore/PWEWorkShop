import {createSlice} from '@reduxjs/toolkit';

const CredSlice = createSlice({
  name: 'cred',
  initialState: {},
  reducers: {
    setCred: (state, action) => {
      console.log(action)
      return action.payload
    },
    clearCred: (state, action) => {
      state = {};
    },
  },
});

export const {setCred, clearCred} = CredSlice.actions;
export default CredSlice;
