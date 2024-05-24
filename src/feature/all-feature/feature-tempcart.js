import { createSlice } from "@reduxjs/toolkit";

const TempCartItemsInitialState = {
  Ironing: [],
  DryClean: [],
};

const tempCartItemsSlice = createSlice({
  name: 'tempCartItems',
  initialState: TempCartItemsInitialState,
  reducers: {
    deleteAllFromTempCart: () => TempCartItemsInitialState,
    addToTempCartDryClean: (state, action) => {
      state.DryClean.push(action.payload);
    },
    addToTempCartIroning: (state, action) => {
      state.Ironing.push(action.payload);
    },
    removeFromTempCartDryClean: (state, action) => {
      state.DryClean = state.DryClean.filter(obj => obj.Date !== action.payload.Date);
    },
    removeFromTempCartIroning: (state, action) => {
      state.Ironing = state.Ironing.filter(obj => obj.Date !== action.payload.Date);
    },
    deleteAllFromTempCartDryClean: (state) => {
      state.DryClean = [];
    },
    deleteAllFromTempCartIroning: (state) => {
      state.Ironing = [];
    },
    concatAllFromTempCartIroning: (state, action) => {
      state.Ironing = [...state.Ironing, ...action.payload];
    },
    concatAllFromTempCartDryClean: (state, action) => {
      state.DryClean = [...state.DryClean, ...action.payload];
    },
    updateItemFromTempCartDryClean: (state, action) => {
      const { existingDataIndex, addQuantity } = action.payload;
      state.DryClean[existingDataIndex].Quantity += parseInt(addQuantity);
    },
    updateItemFromTempCartIroning: (state, action) => {
      const { existingDataIndex, addQuantity } = action.payload;
      state.Ironing[existingDataIndex].Quantity += parseInt(addQuantity);
    },
  }
});

export const {
  deleteAllFromTempCart,
  addToTempCartDryClean,
  addToTempCartIroning,
  removeFromTempCartDryClean,
  removeFromTempCartIroning,
  deleteAllFromTempCartDryClean,
  deleteAllFromTempCartIroning,
  concatAllFromTempCartIroning,
  concatAllFromTempCartDryClean,
  updateItemFromTempCartDryClean,
  updateItemFromTempCartIroning,
} = tempCartItemsSlice.actions;

export default tempCartItemsSlice;


