
/** react app state */

import { Member } from "./member";
import { Product } from "./product";
import { Order } from "./order";


export interface AppRootState{
    homePage: HomePageState;
    productsPage: ProductPageStage;
    ordersPage: OrdersPageState;
};

/** Homepage */
export interface HomePageState{
    popularProducts: Product[];
    newProducts: Product[];
    topUsers: Member[];
}



export interface ProductPageStage{
    restaurant: Member | null;
    chosenProduct: Product | null;
    products: Product[];
}
/** Orders */


export interface OrdersPageState {
	pausedOrders: Order[];
	processOrders: Order[];
	finishedOrders: Order[];
}
/** Orders */

