import { ProductCollection, ProductSize, ProductStatus } from "../enums/product.enum";




export interface Product {
	_id: string;
	productStatus: ProductStatus;
	productCollection: ProductCollection;
	productName: string;
	productPrice: number;
	productLeftCount: number;
	productSize: ProductSize;
	productVolume: number;
	productDesc?: string;
	productViews: number;
    productImages: string[];
    createdAt: Date;
    updatedAt: Date;
    
}

export interface ProductInquiry {
	order: string;
	page: number;
	limit: number;
	productCollection?: ProductCollection;
	search?: string;
}




export interface ProductInput {
	productStatus?: ProductStatus;
	productCollection: ProductCollection;
	productName: string;
	productPrice: number;
	productLeftCount: number;
	productSize?: ProductSize;
	productVolume?: number;
	productDesc?: string;

	productViews?: number;
	productImages?: string[];
}

export interface ProductUpdateInput {
	_id: string;
	productStatust?: ProductStatus;
	productCollection?: ProductCollection;
	productName?: string;
	productPrice?: number;
	productLeftCount?: number;
	productSize?: ProductSize;
	productVolume?: number;
	productDesc?: string;
	productViews?: number;
	productImages?: string[];
}

