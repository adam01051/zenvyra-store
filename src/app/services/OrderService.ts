import axios from "axios";
import { serverApi } from "../../lib/config";
import { CartItem } from "../../lib/types/search";
import { Order, OrderInquiry, OrderItemInput, OrderUpdateInput } from "../../lib/types/order";
import { ProductSize } from "../../lib/enums/product.enum";

class OrderService {
	private readonly path: string;

	constructor() {
		this.path = serverApi;
	}

	public async createOrder(input: CartItem[]): Promise<Order> {
		try {
			const orderItems: OrderItemInput[] = input.map((cartItem: CartItem) => {
				return {
					itemQuantity: cartItem.quantity,
					itemPrice: cartItem.price,
					productId: cartItem._id,
					selectedSize: cartItem.selectedSize as ProductSize,
				};
			});
	console.log(orderItems.map(item => item.selectedSize));
			const url = this.path + "/order/create";
			const result = await axios.post(url, orderItems, {
				withCredentials: true,
			});
			console.log("createOrders ", result);
			return result.data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	public async getMyOrders(input: OrderInquiry): Promise<Order[]> {
		try {
			const url = `${this.path}/order/all`;
			const query = `?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;
			const result = await axios.get(url + query, { withCredentials: true });
			console.log("object:", result.data);
			return result.data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
	public async updateOrder(input: OrderUpdateInput): Promise<Order> {
		try {
			const url = `${this.path}/order/update`;


			const result = await axios.post(url,input, { withCredentials: true });
			console.log("update:", result.data);
			return result.data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
export default OrderService;
