import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    isItemAdded: false,
    isItemDeleted:false,
    isItemEdited:false
  },
  reducers: {
    setItemAdded: (state, action) => {
      state.isItemAdded = action.payload;
    },
    setItemDeleted: (state, action) => {
      state.isItemDeleted = action.payload;
      },
    setItemEdited: (state, action) => {
      state.isItemEdited = action.payload;
      },
  },
});

export const { setItemAdded,setItemEdited,setItemDeleted } = globalSlice.actions;
export default globalSlice.reducer;