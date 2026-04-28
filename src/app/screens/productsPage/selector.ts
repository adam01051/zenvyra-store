import { AppRootState } from "../../../lib/types/screen";
import { createSelector } from "@reduxjs/toolkit";

export const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retriveRestaurant = createSelector(
	selectProductsPage,
	(ProductsPage) => ProductsPage.restaurant,
);


export const retriveChosenProduct = createSelector(
	selectProductsPage,
	(ProductsPage) => ProductsPage.chosenProduct,
);


export const retriveProducts = createSelector(
	selectProductsPage,
	(ProductsPage) => ProductsPage.products,
);
