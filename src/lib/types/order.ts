import { OrderStatus } from "../enums/order.enum";
import { ProductSize } from "../enums/product.enum";

import { Product } from "./product";

export interface OrderItem {
	_id: string;
	itemQuantity: number;
	itemPrice: number;
	productId: string;
	selectedSize:ProductSize;
	orderId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderItemInput {
	itemQuantity: number;
	itemPrice: number;
	productId: string;
	orderId?: string;
	selectedSize?: ProductSize;
}

export interface Order {
	_id: string;
	orderTotal: number;
	orderDelivery: number;
	orderStatus: OrderStatus;
	memberId: string;
	createdAt: Date;
	updatedAt: Date;

	//from agregations
	orderItems: OrderItem[];
	productData: Product[];
}

export interface OrderInquiry {
	page: number;
	limit: number;
	orderStatus: OrderStatus;
}

export interface OrderUpdateInput {
	orderId: string;
	orderStatus: OrderStatus;
}
