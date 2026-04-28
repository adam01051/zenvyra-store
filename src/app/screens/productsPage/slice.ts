import { createSlice } from "@reduxjs/toolkit";
import { ProductPageStage } from "../../../lib/types/screen";

const initialState: ProductPageStage = {
	restaurant: null,
	chosenProduct: null,
	products: [],
};

const productPageStage = createSlice({
	name: "productsPage",
	initialState,
	reducers: {
		setRestaurant: (state, action) => {
			state.restaurant = action.payload;
		},
		setChosenProduct: (state, action) => {
			state.chosenProduct = action.payload;
		},
		setProducts: (state, action) => {
			state.products = action.payload;
		},
	},
});

export const { setChosenProduct, setProducts, setRestaurant } =
	productPageStage.actions;

const ProductsPageReducer = productPageStage.reducer;
export default ProductsPageReducer;