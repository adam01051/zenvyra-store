import { AppRootState } from "../../../lib/types/screen";
import { createSelector } from "@reduxjs/toolkit";

export const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retriveStore = createSelector(
	selectProductsPage,
	(ProductsPage) => ProductsPage.store,
);


export const retriveChosenProduct = createSelector(
	selectProductsPage,
	(ProductsPage) => ProductsPage.chosenProduct,
);


export const retriveProducts = createSelector(
	selectProductsPage,
	(ProductsPage) => ProductsPage.products,
);
