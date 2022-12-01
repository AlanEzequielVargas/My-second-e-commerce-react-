import { createSlice } from "@reduxjs/toolkit";
import getConfig from "../../utils/getConfig";
import { setSpinner } from "./spinner.slice";
import axios from "axios";

export const cartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		getProductsCart: (state, action) => {
			return action.payload;
		},
	},
});

export const getCartProductsThunk = () => (dispatch) => {
	dispatch(setSpinner(true));
	return axios
		.get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
		.then((res) => dispatch(getProductsCart(res.data.data.cart.products)))
		.finally(() => dispatch(setSpinner(false)));
};

export const addProductToCartThunk = (product) => (dispatch) => {
	dispatch(setSpinner(true));
	return axios
		.post(
			"https://e-commerce-api.academlo.tech/api/v1/cart",
			product,
			getConfig()
		)
		.then(() => dispatch(getCartProductsThunk()))
		.finally(() => dispatch(setSpinner(false)));
};

export const deleteProductFromCartThunk = (id) => (dispatch) => {
	dispatch(setSpinner(true));
	return axios
		.delete(
			`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`,
			getConfig()
		)
		.then(() => dispatch(getCartProductsThunk()))
		.finally(() => dispatch(setSpinner(false)));
};

export const updateProductCartThunk = (updatedProduct) => (dispatch) => {
	dispatch(setSpinner(true));
	return axios
		.patch(
			"https://e-commerce-api.academlo.tech/api/v1/cart",
			updatedProduct,
			getConfig()
		)
		.then(() => dispatch(getCartProductsThunk()))
		.finally(() => dispatch(setSpinner(false)));
};

export const checkoutCartThunk = () => (dispatch) => {
	dispatch(setSpinner(true));
	return axios
		.post(
			"https://e-commerce-api.academlo.tech/api/v1/purchases",
			{},
			getConfig()
		)
		.then(() => dispatch(getProductsCart([])))
		.finally(() => dispatch(setSpinner(false)));
};

export const { getProductsCart } = cartSlice.actions;

export default cartSlice.reducer;
