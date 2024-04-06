import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boundAddress: '',
  name: '',
};

const BluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState: initialState,
  reducers: {
    setBoundAddress: (state, action) => {
      state.boundAddress = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    clearBluetooth: state => {
      return initialState;
    },
  },
});

export const {setBoundAddress, setName, clearBluetooth} =
  BluetoothSlice.actions;
export default BluetoothSlice;
