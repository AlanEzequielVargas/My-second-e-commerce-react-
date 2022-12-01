import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setSpinner } from "./spinner.slice";

export const productsSlice = createSlice({
	name: "products",
	initialState: [],
	reducers: {
		getProducts: (state, action) => {
			return action.payload;
		},
	},
});

export const getProductsThunk = () => (dispatch) => {
	dispatch(setSpinner(true));
	axios.get("https://e-commerce-api.academlo.tech/api/v1/products")
		.then((res) => dispatch(getProducts(res.data.data.products)))
		.finally(() => dispatch(setSpinner(false)));
};

export const filterProductsByCategoryThunk = (id) => (dispatch) => {
	dispatch(setSpinner(true));
	return axios
		.get(
			`https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`
		)
		.then((res) => dispatch(getProducts(res.data.data.products)))
		.finally(() => dispatch(setSpinner(false)));
};

export const filterProductsThunk = (inputSearch) => (dispatch) => {
	dispatch(setSpinner(true));
	return axios
		.get(
			`https://e-commerce-api.academlo.tech/api/v1/products?query=${inputSearch}`
		)
		.then((res) => dispatch(getProducts(res.data.data.products)))
		.finally(() => dispatch(setSpinner(false)));
};

export const { getProducts } = productsSlice.actions;

export default productsSlice.reducer;
