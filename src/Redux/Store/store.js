import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../Slice/counterslice';
import itemSelectedForEditReducer from '../Slice/itemSelectedForEditSlice';

const store = configureStore({
    reducer: {
      counter: counterReducer,
      itemSelectedForEdit: itemSelectedForEditReducer,
    },
  });
  
  export default store;