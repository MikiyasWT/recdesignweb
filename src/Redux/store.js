import { configureStore, combineReducers } from '@reduxjs/toolkit';
import globalReducer from './globalSlice';

const rootReducer = combineReducers({
  global: globalReducer,
  // Add other reducers here
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;