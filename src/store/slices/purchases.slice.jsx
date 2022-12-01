import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setSpinner } from './spinner.slice';

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
      setPurchases: (state,action) => {
         return action.payload
      }
    }
})

export const getPurchasesThunk = () => (dispatch) => {
    dispatch(setSpinner(true));
    return axios.get('https://e-commerce-api.academlo.tech/api/v1/purchases' , getConfig())
        .then((res) => dispatch(setPurchases(res.data)))
        .finally(() => dispatch(setSpinner(false)));
}

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
