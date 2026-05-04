import { Box, Container, Stack } from "@mui/material";

import Card from "@mui/joy/Card";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AspectRatio from "@mui/joy/AspectRatio";
import Divider from "../../components/divider";
import CardContent from "@mui/joy/CardContent";
import { createSelector } from "@reduxjs/toolkit";
import { retriveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";

import CardCover from "@mui/joy/CardCover";
import { serverApi } from "../../../lib/config";
import { useSelector } from "react-redux";

const newDishesRetriever = createSelector(retriveNewDishes, (newDishes) => ({
	newDishes,
}));

export default function NewDishes() {
	const { newDishes } = useSelector(newDishesRetriever);

	return (
		<div className="new-products-frame">
			<Container>
				<Stack className="main">
					<Box sx={{ width: "130px" }} className="category-title">
						FRESH MENU
					</Box>

					<Stack className="cards-frame">
						{newDishes.length !== 0 ? (
							newDishes.map((product: Product) => {
								const imagePath = `${serverApi}/${product.productImages[0]}`;

								return (
									<CssVarsProvider key={product._id}>
										<Card className="card">
											<CardCover>
												<img src={imagePath} alt="" />
											</CardCover>

											<CardCover className="card-cover" />

											<CardContent
												sx={{
													justifyContent: "flex-end",
												}}
											/>

											<CardOverflow
												sx={{
													display: "flex",
													flexDirection: "column",
													gap: 0.5,
													py: 1.5,
													px: "var(--Card-padding)",
													background: "#F0EEED",
												}}
											>
												<Typography
													sx={{
														fontSize: "20px",
														fontWeight: 700,
														fontFamily: "Satoshi",
														color: "#000",
														textTransform: "capitalize",
													}}
												>
													{product.productName}
												</Typography>

												<Stack flexDirection="row" alignItems="center" gap={1}>
													<Typography
														sx={{
															fontSize: "24px",
															fontWeight: 700,
															fontFamily: "Satoshi",
															color: "#000",
														}}
													>
														${product.productPrice}
													</Typography>
												</Stack>

												<Stack
													flexDirection="row"
													justifyContent="space-between"
												>
													<Typography
														sx={{
															fontWeight: "md",
															color: "neutral.300",
															alignItems: "center",
															display: "flex",
														}}
													>
														{product.productViews}
														<VisibilityIcon
															sx={{
																fontSize: "20px",
																marginLeft: "5px",
															}}
														/>
													</Typography>
												</Stack>
											</CardOverflow>
										</Card>
									</CssVarsProvider>
								);
							})
						) : (
							<Box className="no-data">New dishes are not available!</Box>
						)}
					</Stack>
				</Stack>
			</Container>
		</div>
	);
}
