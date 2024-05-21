import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    isItemAdded: false,
    isItemDeleted:false,
    isItemEdited:false,
    isAdmin:false,
    isManager:false,
    isGuest:false
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
      setIsAdmin: (state, action) => {
        state.isAdmin = action.payload;
        },
        setIsManager: (state, action) => {
          state.isManager = action.payload;
          },
          setIsGuest: (state, action) => {
            state.isGuest = action.payload;
            },
  },
});

export const { setItemAdded,setItemEdited,setItemDeleted, setIsAdmin, setIsManager,setIsGuest  } = globalSlice.actions;
export default globalSlice.reducer;