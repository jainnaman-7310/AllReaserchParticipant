import { configureStore } from '@reduxjs/toolkit';
import reducer from 'slices/index';

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
