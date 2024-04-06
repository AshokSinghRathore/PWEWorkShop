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

    clearServicePinCode: state => {
      return initialState;
    },

    updateServicePinCode: (state, action) => {
      return {
        planePinCodeArray: [...state.planePinCodeArray],
        servicePinCodeArray: state.servicePinCodeArray.map(e => {
          if (e.pathRef == action.payload.pathRef) {
            return action.payload;
          } else {
            return e;
          }
        }),
      };
    },
  },
});

export const {setServicePinCode, clearServicePinCode, updateServicePinCode} =
  ServicePinCodeSlice.actions;
export default ServicePinCodeSlice;
