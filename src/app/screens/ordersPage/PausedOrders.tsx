import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { createSelector } from "@reduxjs/toolkit";
import { retrivePausedOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";
import OrderService from "../../services/OrderService";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";

const pausedOrdersRetriever = createSelector(
	retrivePausedOrders,
	(pausedOrders) => ({ pausedOrders }),
);

interface PaausedOrdersProps{
	setValue: (input: string) =>void;
}
export default function PausedOrders(props: PaausedOrdersProps) {
	const { setValue } = props;
const {pausedOrders} = useSelector(pausedOrdersRetriever);
	const { authMember ,setOrderBuilder} = useGlobals();
	
	const deleteOrderHandler = async (e: T) => {
		try {
			if (!authMember) throw new Error(Messages.error2);
			const orderId = e.target.value;
			const input: OrderUpdateInput = {
				orderId: orderId,
				orderStatus: OrderStatus.DELETE,
			};

			const confirmation = window.confirm("do you want to delete order");
			if (confirmation) {
				const order = new OrderService();

				await order.updateOrder(input);

				
				setOrderBuilder(new Date());
				//order rebuild

			}

		} catch (error) {
			console.log(error);
			sweetErrorHandling(error).then();
		}
	};

		const processOrderHandler = async (e: T) => {
			try {
				if (!authMember) throw new Error(Messages.error2);
				//payment


				const orderId = e.target.value;
				const input: OrderUpdateInput = {
					orderId: orderId,
					orderStatus: OrderStatus.PROCESS,
				};

				const confirmation = window.confirm("do you want to proceed with payment");
				if (confirmation) {
					const order = new OrderService();

					await order.updateOrder(input);
					//process order
					setValue("2");
					setOrderBuilder(new Date());
					//order rebuild
				}
			} catch (error) {
				console.log(error);
				sweetErrorHandling(error).then();
			}
		};
	
	
	
	return (
		<TabPanel value={"1"}>
			<Stack>
				{pausedOrders?.map((order: Order) => {
					return (
						<Box key={order._id} className={"order-main-box"}>
							<Box className={"order-box-scroll"}>
								{order?.orderItems?.map((item: OrderItem) => {
										const product = order.productData?.find(
																			(ele: Product) => item.productId === ele._id,
																		);
									
																		if (!product) return null;
									const imagePath = `${serverApi}/${product.productImages[0]}`;
									return (
										<Box key={item._id} className={"orders-name-price"}>
											<img
												src={imagePath}
												className={"order-dish-img"}
												alt=""
											/>
											<p className={"title-dish"}>{product.productName}</p>
											<p>{item.selectedSize} - size</p>
											
											<Box className={"price-box"}>
												<p>${item.itemPrice}</p>
												<img src={"/icons/close.svg"} alt="" />
												<p>{item.itemQuantity}</p>
												<img src={"/icons/pause.svg"} alt="" />
												<p style={{ marginLeft: "15px" }}>
													${item.itemQuantity * item.itemPrice}
												</p>
											</Box>
										</Box>
									);
								})}
							</Box>

							<Box className={"total-price-box"}>
								<Box className={"box-total"}>
									<p>Product price</p>
									<p>${order.orderTotal - order.orderDelivery}</p>
									<img
										src={"/icons/plus.svg"}
										style={{ marginLeft: "20px" }}
										alt=""
									/>
									<p>delivery cost</p>
									<p>${order.orderDelivery}</p>
									<img
										src={"/icons/pause.svg"}
										style={{ marginLeft: "20px" }}
										alt=""
									/>
									<p>Total</p>
									<p>${order.orderTotal}</p>
								</Box>
								<Button
									value={order._id}
									variant="contained"
									color="secondary"
									className={"cancel-button"}
									onClick={deleteOrderHandler}
								>
									Cancel
								</Button>
								<Button
									value={order._id}
									variant="contained"
									className={"pay-button"}
									onClick={processOrderHandler}
								>
									Payment
								</Button>
							</Box>
						</Box>
					);
				})}

				{(!pausedOrders || pausedOrders.length === 0) && (
					<Box display="flex" justifyContent="center">
						<img
							src="/icons/noimage-list.svg"
							alt=""
							style={{ width: 300, height: 300 }}
						/>
					</Box>
				)}
			</Stack>
		</TabPanel>
	);
}
