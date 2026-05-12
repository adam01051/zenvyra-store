import { TabContext } from "@mui/lab";
import { Box, Container, Stack, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
//@ts-ignore
import "../../../css/orders.css";
import Divider from "../../components/divider";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { Dispatch } from "@reduxjs/toolkit";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

const actionDispatch = (dispatch: Dispatch) => ({
	setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
	setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
	setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
	const { setPausedOrders, setProcessOrders, setFinishedOrders } =
		actionDispatch(useDispatch());
	const { orderBuilder, authMember } = useGlobals();
	const [value, setValue] = useState("1");
	const handleChange = (e: SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
		page: 1,
		limit: 5,
		orderStatus: OrderStatus.PAUSE,
	});

	useEffect(() => {
		const order = new OrderService();
		order
			.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
			.then((data) => setPausedOrders(data))
			.catch((err) => console.log(err));
		order
			.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
			.then((data) => setProcessOrders(data))
			.catch((err) => console.log(err));
		order
			.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
			.then((data) => setFinishedOrders(data))
			.catch((err) => console.log(err));
	}, [orderInquiry, orderBuilder]);

	/**Handlers */
	const history = useHistory();

	if (!authMember) history.push("/");

	return (
		<div className={"order-page"}>
			<Container className="order-container">
				<Stack className={"order-left"}>
					<TabContext value={value}>
						<Box className={"order-nav-frame"}>
							<Box
								sx={{
									width: "95%",
									borderBottom: "1px solid rgba(0,0,0,0.08)",
									background: "#f3f4f6",
									borderRadius: "12px",
									padding: "8px",
								}}
							>
								<Tabs
									value={value}
									onChange={handleChange}
									aria-label="basic tabs"
									className={"table-list"}
									TabIndicatorProps={{
										style: { display: "none" },
									}}
									sx={{
										minHeight: "52px",
										"& .MuiTabs-flexContainer": {
											gap: "10px",
											justifyContent: "space-between",
										},
									}}
								>
									<Tab
										label="PAUSED ORDERS"
										value={"1"}
										sx={{
											flex: 1,
											minHeight: "44px",
											borderRadius: "10px",
											fontFamily: "Satoshi",
											fontSize: "14px",
											fontWeight: 700,
											textTransform: "none",
											color: "rgba(0,0,0,0.55)",
											background: "#ffffff",
											transition: "0.1s",
											"&.Mui-selected": {
												background: "#000000",
												color: "#ffffff",
											},
										}}
									/>

									<Tab
										label="PROCESS ORDERS"
										value={"2"}
										sx={{
											flex: 1,
											minHeight: "44px",
											borderRadius: "10px",
											fontFamily: "Satoshi",
											fontSize: "14px",
											fontWeight: 700,
											textTransform: "none",
											color: "rgba(0,0,0,0.55)",
											background: "#ffffff",
											transition: "0.2s",
											"&.Mui-selected": {
												background: "#000000",
												color: "#ffffff",
											},
										}}
									/>

									<Tab
										label="FINISHED ORDERS"
										value={"3"}
										sx={{
											flex: 1,
											minHeight: "44px",
											borderRadius: "10px",
											fontFamily: "Satoshi",
											fontSize: "14px",
											fontWeight: 700,
											textTransform: "none",
											color: "rgba(0,0,0,0.55)",
											background: "#ffffff",
											transition: "0.2s",
											"&.Mui-selected": {
												background: "#000000",
												color: "#ffffff",
											},
										}}
									/>
								</Tabs>
							</Box>
						</Box>

						<Stack className="order-main-content">
							<PausedOrders setValue={setValue} />
							<ProcessOrders setValue={setValue} />
							<FinishedOrders />
						</Stack>
					</TabContext>
				</Stack>

				<Stack className={"order-right"}>
					<Box className={"order-info-box"}>
						<Box className={"member-box"}>
							<div className="order-user-img">
								<img
									src={
										authMember?.memberImage
											? `${serverApi}/${authMember.memberImage}`
											: "/icons/user-icon.svg"
									}
									alt=""
									className="order-user-avatar"
								/>
							</div>
						
						</Box>

						<Box className={"order-user-name"}>{authMember?.memberNick}</Box>
						<Box className={"order-user-status"}> {authMember?.memberType}</Box>
						<Divider height="2" width="332.5" bg="#A1A1A1" />
						<div className="order-location-box">
							<img src={"/icons/location.svg"} alt="" />
							<span className={"order-location"}>
								{" "}
								{authMember?.memberAddress
									? authMember?.memberAddress
									: " Do not Exist"}
							</span>
						</div>
					</Box>

					<Box className={"payment-details-box"}>
						<div className="payment-info">
							<input
								className="payment-info-textfield"
								type="text"
								placeholder="Card number : 5243 4090 2002 7495"
							/>
							<div className="payment-info-textfield-sm-box">
								<input
									className="payment-info-textfield-sm"
									type="text"
									placeholder="07 / 24"
								/>
								<input
									className="payment-info-textfield-sm"
									type="text"
									placeholder="CVV : 010"
								/>
							</div>
							<input
								className="payment-info-textfield"
								type="text"
								placeholder="Justin Robertson"
							/>
						</div>
						<div className="payment-card-logos">
							<img src={"/icons/master-card.svg"} alt="" />
							<img src={"/icons/western-card.svg"} alt="" />
							<img src={"/icons/visa-card.svg"} alt="" />
							<img src={"/icons/paypal-card.svg"} alt="" />
						</div>
					</Box>
				</Stack>
			</Container>
		</div>
	);
}




//modification in signup and login 
//adding  stock  size and quantity to the choosen product
