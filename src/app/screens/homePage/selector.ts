import { AppRootState } from "../../../lib/types/screen";
import { createSelector } from "@reduxjs/toolkit";

export const selectHomePage = (state: AppRootState) => state.homePage;

export const retrivePopularProducts = createSelector(
	selectHomePage,
	(HomePage) => HomePage.popularProducts,
);


export const retriveNewProducts = createSelector(
	selectHomePage,
	(HomePage) => HomePage.newProducts,
);


export const retriveTopUsers = createSelector(
	selectHomePage,
	(HomePage) => HomePage.topUsers,
);
