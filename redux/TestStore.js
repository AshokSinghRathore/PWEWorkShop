import {configureStore} from '@reduxjs/toolkit';
import DryCleanOrderSlice from './feature-dryclean';

const TestStore = configureStore({
  reducer: {
    DryCleanOrder: DryCleanOrderSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default TestStore;
