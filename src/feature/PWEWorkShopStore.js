import {configureStore} from '@reduxjs/toolkit';
import Cred from './all-feature/feature-cred';
import ServicePinCodeSlice from './all-feature/feature-servicepincode';

const PWEWorkShopStore = configureStore({
  reducer: {
    Cred: Cred.reducer,
    ServicePinCode: ServicePinCodeSlice.reducer,
  },
});

export default PWEWorkShopStore;
