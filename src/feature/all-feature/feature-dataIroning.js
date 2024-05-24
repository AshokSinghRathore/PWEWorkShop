import { createSlice } from "@reduxjs/toolkit";


const ironingChargesInitial = {
    IroningInstant: {},
    IroningDelayed: {},
    IroningNormal: {},
    specialCloth:[],
    fetched: false,
  };


const IroningChargesSlice = createSlice({
    name: 'IroningCharges',
    initialState: ironingChargesInitial,
    reducers: {
        setIroningCharge: (state, action) => {
            state.IroningInstant = action.payload.IroningInstant;
            state.IroningDelayed = action.payload.IroningDelayed;
            state.IroningNormal = action.payload.IroningNormal;
            state.specialCloth = action.payload.specialCloth;
            state.fetched = true;
        }
    }
})

export const { setIroningCharge } = IroningChargesSlice.actions;
export default IroningChargesSlice;
