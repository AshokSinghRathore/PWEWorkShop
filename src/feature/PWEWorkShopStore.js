import {configureStore} from '@reduxjs/toolkit';
import Cred from './all-feature/feature-cred';
import ServicePinCodeSlice from './all-feature/feature-servicepincode';
import DryCleanSlice from './all-feature/feature-dryclean';
import IroningOrderSlice from './all-feature/feature-ironing';
import BluetoothSlice from './all-feature/feature-bluetooth';
import ConcernOrderSlice from './all-feature/feature-concern';
import CouponSlice from './all-feature/feature-coupon';

const PWEWorkShopStore = configureStore({
  reducer: {
    Cred: Cred.reducer,
    ServicePinCode: ServicePinCodeSlice.reducer,
    DryCleanOrder: DryCleanSlice.reducer,
    IroningOrder: IroningOrderSlice.reducer,
    BluetoothSlice: BluetoothSlice.reducer,
    ConcernSlice:ConcernOrderSlice.reducer,
    CouponSlice:CouponSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default PWEWorkShopStore;
