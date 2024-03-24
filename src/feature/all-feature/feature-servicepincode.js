import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  planePinCodeArray: [],
  servicePinCodeArray: [],
};

const ServicePinCodeSlice = createSlice({
  name: 'servicepincode',
  initialState: initialState,
  reducers: {
    setServicePinCode: (state, action) => {
      return {
        planePinCodeArray: action.payload.planePinCodeArray,
        servicePinCodeArray: action.payload.servicePinCodeArray,
      };
    },
  },
});

export const {setServicePinCode} = ServicePinCodeSlice.actions;
export default ServicePinCodeSlice;
