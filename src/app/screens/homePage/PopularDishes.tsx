import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import { CssVarsProvider } from "@mui/joy/styles";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { createSelector } from "@reduxjs/toolkit";
import { retrivePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";

import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";

const popularDishesRetriever = createSelector(
	retrivePopularDishes,
	(popularDishes) => ({ popularDishes }),
);
//neeed  to change  the name  from  popular dishes  to top selling  because  it  is  more  accurate
export default function PopularDishes() {
	const { popularDishes } = useSelector(popularDishesRetriever);
	return (
		<div className="popular-items-frame">
			<Container>
				<Stack className="popular-section">
					<Box className="category-title">TOP SELLING</Box>

					<Stack className="cards-frame">
						{popularDishes.length !== 0 ? (
							popularDishes.map((product: Product) => {
								const imagePath = `${serverApi}/${product.productImages[0]}`;
								return (
									<CssVarsProvider key={product._id}>
										<Card className={"card"}>
											<CardCover>
												<img src={imagePath} alt="" />
											</CardCover>
											<CardCover className={"card-cover"} />
											<CardContent
												sx={{ justifyContent: "flex-end" }}
											></CardContent>

											<CardOverflow
												sx={{
													display: "flex",
													flexDirection: "column", // ← stack vertically
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
													flexDirection={"row"}
													justifyContent={"space-between"}
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
																color: "black.900",
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
							<Box className={"no-data"}>New products are not available!</Box>
						)}
					</Stack>
				</Stack>
			</Container>
		</div>
	);
}
