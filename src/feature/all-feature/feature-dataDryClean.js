import { createSlice } from "@reduxjs/toolkit";




const DryCleanDataSlice = createSlice({
    name: "dryCleanData",
    initialState: {
        cloth: [],
        type: [],
        fetched: false,
    },
    reducers: {
        setDryCleanType(state, action) {
            state.type = action.payload.typeData;
            state.fetched = action.payload.fetched;
        },
        setDryCleanCloth(state, action) {
            state.cloth = action.payload.clothData;
            state.fetched = action.payload.fetched;
        },
    },
});

export const { setDryCleanType, setDryCleanCloth } = DryCleanDataSlice.actions;
export default DryCleanDataSlice;
