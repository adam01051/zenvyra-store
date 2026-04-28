import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";

import { Box, Button, Container, Stack } from "@mui/material";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retriveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

const actionDispatch = (dispatch: Dispatch) => ({
	setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retriveProducts, (products) => ({
	products,
}));


interface ProductsProps {
	onAdd: (items: CartItem) => void;
}
export default function Products(props: ProductsProps) {
	const { setProducts } = actionDispatch(useDispatch());
	const { onAdd } = props;
	const { products } = useSelector(productsRetriever);
	const [productSearch, setProductSearch] = useState<ProductInquiry>({
		page: 1,
		limit: 3,
		order: "createdAt",
		productCollection: ProductCollection.DISH,
		search: "",
	});
	const [searchText, setSearchText] = useState<string>("");
	const history = useHistory();

	useEffect(() => {
		const product = new ProductService();
		product
			.getProducts(productSearch)
			.then((data) => setProducts(data))
			.catch((err) => console.log(err));
	}, [productSearch]);

	useEffect(() => {
		if (searchText === "") {
			productSearch.search = "";
			setProductSearch({ ...productSearch });
		}
	}, [searchText]);

	/**handlers */

	const searchCollectionHandler = (collection: ProductCollection) => {
		productSearch.page = 1;
		productSearch.productCollection = collection;
		setProductSearch({ ...productSearch });
	};

	const searchOrderHandler = (order: string) => {
		productSearch.page = 1;
		productSearch.order = order;
		setProductSearch({ ...productSearch });
	};
	const searchProductHandler = () => {
		productSearch.search = searchText;
		setProductSearch({ ...productSearch });
	};

	const paginationHandler = (e: ChangeEvent<any>, value: number) => {
		productSearch.page = value;
		setProductSearch({ ...productSearch });
	};
	const chooseDishHandler = (id: string) => {
		history.push(`/products/${id}`);
	};

	return (
		<div className={"products"}>
			<Container>
				<Stack flexDirection={"column"} alignItems={"center"}>
					<Stack className={"avatar-big-box"}>
						<Box className={"title"}> Burak Restaurant</Box>
						<Box className={"search-container"}>
							<input
								className={"search-input"}
								placeholder="Type in here"
								type={"search"}
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") searchProductHandler();
								}}
							/>
							<Button
								variant={"contained"}
								color={"primary"}
								className={"search-button"}
								onClick={searchProductHandler}
							>
								Search
							</Button>
						</Box>
					</Stack>

					<Stack className={"dishes-filter-section"}>
						<Stack className="dishes-filter-box">
							<Button
								variant={"contained"}
								color={
									productSearch.order === "createdAt" ? "primary" : "secondary"
								}
								className={"order"}
								onClick={() => searchOrderHandler("createdAt")}
							>
								New
							</Button>
							<Button
								variant={"contained"}
								color={
									productSearch.order === "productPrice"
										? "primary"
										: "secondary"
								}
								className={"order"}
								onClick={() => searchOrderHandler("productPrice")}
							>
								Price
							</Button>
							<Button
								variant={"contained"}
								color={
									productSearch.order === "productViews"
										? "primary"
										: "secondary"
								}
								className={"order"}
								onClick={() => searchOrderHandler("productViews")}
							>
								Views
							</Button>
						</Stack>
					</Stack>
					<Stack className={"list-category-section"}>
						<div className="category-main">
							<Button
								variant={"contained"}
								color={
									productSearch.productCollection === ProductCollection.DISH
										? "primary"
										: "secondary"
								}
								className={"order"}
								onClick={() => searchCollectionHandler(ProductCollection.DISH)}
							>
								Dish
							</Button>
							<Button
								variant={"contained"}
								color={
									productSearch.productCollection === ProductCollection.SALAD
										? "primary"
										: "secondary"
								}
								className={"order"}
								onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
							>
								SALAD
							</Button>
							<Button
								variant={"contained"}
								color={
									productSearch.productCollection === ProductCollection.DRINK
										? "primary"
										: "secondary"
								}
								className={"order"}
								onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
							>
								DRINK
							</Button>
							<Button
								variant={"contained"}
								color={
									productSearch.productCollection === ProductCollection.DESSERT
										? "primary"
										: "secondary"
								}
								className={"order"}
								onClick={() =>
									searchCollectionHandler(ProductCollection.DESSERT)
								}
							>
								DESERT
							</Button>
							<Button
								variant={"contained"}
								color={
									productSearch.productCollection === ProductCollection.OTHER
										? "primary"
										: "secondary"
								}
								className={"order"}
								onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
							>
								OTHER
							</Button>
						</div>
						<Stack className={"product-wrapper"}>
							{products.length !== 0 ? (
								products.map((product: Product) => {
									const imagePath = `${serverApi}/${product.productImages[0]}`;
									const sizeVolume =
										product.productCollection === ProductCollection.DRINK
											? product.productVolume + "l"
											: product.productSize + " size";
									return (
										<Stack
											key={product._id}
											className={"product-card"}
											onClick={() => chooseDishHandler(product._id)}
										>
											<Stack
												className={"product-img"}
												sx={{ backgroundImage: `url(${imagePath})` }}
											>
												<div className={"product-sale"}>{sizeVolume}</div>

												<Button className={"shop-btn"}
													onClick={(e) => {
													onAdd({
														_id:product._id,
														quantity: 1,
														name:product.productName,
														price: product.productPrice,
														image:product.productImages[0],
													})
													e.stopPropagation();

												}}>
													<img
														src={"/icons/shopping-cart.svg"}
														style={{ display: "flex" }}
														alt="shopping"
													/>
												</Button>

												<Button className={"view-btn"} sx={{ right: "36px" }}>
													<Badge badgeContent={20} color="secondary">
														<RemoveRedEyeIcon
															sx={{
																color:
																	product.productViews === 0 ? "gray" : "white",
															}}
														/>
													</Badge>
												</Button>
											</Stack>

											<Box className={"product-desc"}>
												<span className={"product-title"}>
													{product.productName}
												</span>

												<div className={"product-price"}>
													<MonetizationOnIcon />
													{product.productPrice}
												</div>
											</Box>
										</Stack>
									);
								})
							) : (
								<Box className="no-data">Products are not available!</Box>
							)}
						</Stack>
					</Stack>

					<Stack className={"pagination-section"}>
						<Pagination
							count={
								products.length !== 0
									? productSearch.page + 1
									: productSearch.page
							}
							page={productSearch.page}
							renderItem={(item) => (
								<PaginationItem
									components={{
										previous: ArrowBackIcon,
										next: ArrowForwardIcon,
									}}
									{...item}
									color={"secondary"}
								/>
							)}
							onChange={paginationHandler}
						/>
					</Stack>
				</Stack>
			</Container>
			<div className={"brands-logo"}>
				<Container className="brands-logo-container">
					<Box className={"brands-logo-title"}> Our Family Brands</Box>
					<Stack className={"brands-logo-card"}>
						<div className="product-card">
							<img src={"/img/seafood.webp"} alt="Seafood brand" />
						</div>

						<div className="product-card">
							<img src={"/img/sweets.webp"} alt="Sweets brand" />
						</div>

						<div className="product-card">
							<img src={"/img/gurme.webp"} alt="Gurme brand" />
						</div>

						<div className="product-card">
							<img src={"/img/doner.webp"} alt="Doner brand" />
						</div>
					</Stack>
				</Container>
			</div>

			<div className={"address"}>
				<Container className="address-container">
					<Box className={"address-title"}> Our address</Box>

					<iframe
						style={{ marginTop: "60px" }}
						src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d101201.53085089022!2d126.85321859726558!3d37.565715499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1ssamarqand%20restaurant!5e0!3m2!1sen!2skr!4v1771567052029!5m2!1sen!2skr"
						width="1320"
						height="500"
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					></iframe>
				</Container>
			</div>
		</div>
	);
}

//     <Stack></Stack>
//      <Box> </Box>
//       <Container></Container>
