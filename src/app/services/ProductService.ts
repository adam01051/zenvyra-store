import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";
import axios from "axios";

class ProductService {
	private readonly path: string;

	constructor() {
		this.path = serverApi;
	}

	public async getProducts(input: ProductInquiry): Promise<Product[]> {
		try {
			let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;

			if (input.productCollection)
				url += `&productCollection=${input.productCollection}`;
			if (input.search) url += `&search=${input.search}`;

			const result = await axios.get(url);
			console.log("getproduct result", result);

			return result.data;
		} catch (error) {
			console.log("Error, getProduct", error);
			throw error;
		}
	}

	public async getProduct(productId: string): Promise<Product> {
		try {
			const url = `${this.path}/product/${productId}`;

			const result = await axios.get(url,{withCredentials:true})

			return result.data;
		} catch (err) {
			console.log(err)
			throw err;
			
		}
	}
}
export default ProductService;
