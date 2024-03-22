import {configureStore} from '@reduxjs/toolkit';
import Cred from './all-feature/feature-cred';

const PWEWorkShopStore = configureStore({
  reducer: {
    Cred: Cred.reducer,
  },
});

export default PWEWorkShopStore;
