import { createSlice } from '@reduxjs/toolkit';

export const spinnerSlice = createSlice({
    name: 'spinner',
    initialState: false,
    reducers: {
      setSpinner: (state, action) => {
         return action.payload;
       }
    }
})

export const { setSpinner } = spinnerSlice.actions;

export default spinnerSlice.reducer;
