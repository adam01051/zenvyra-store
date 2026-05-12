import { createSlice } from "@reduxjs/toolkit";
import { ProductPageStage } from "../../../lib/types/screen";

const initialState: ProductPageStage = {
	store: null,
	chosenProduct: null,
	products: [],
};

const productPageStage = createSlice({
	name: "productsPage",
	initialState,
	reducers: {
		setStore: (state, action) => {
			state.store = action.payload;
		},
		setChosenProduct: (state, action) => {
			state.chosenProduct = action.payload;
		},
		setProducts: (state, action) => {
			state.products = action.payload;
		},
	},
});

export const { setChosenProduct, setProducts, setStore } =
	productPageStage.actions;

const ProductsPageReducer = productPageStage.reducer;
export default ProductsPageReducer;