import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/free-mode";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";

import { setChosenProduct, setRestaurant } from "./slice";
import { Product } from "../../../lib/types/product";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retriveChosenProduct, retriveRestaurant } from "./selector";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";

import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

const actionDispatch = (dispatch: Dispatch) => ({
	setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
	setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductRetriever = createSelector(
	retriveChosenProduct,
	(chosenProduct) => ({
		chosenProduct,
	}),
);

const restaurantRetriever = createSelector(
	retriveRestaurant,
	(restaurant) => ({
		restaurant,
	}),
);
interface ChosenProductProps {
	onAdd: (items: CartItem) => void;
} 

export default function ChosenProduct(props: ChosenProductProps) {
	const { onAdd } = props;
	const { productId } = useParams<{ productId: string }>();
	const { setRestaurant, setChosenProduct } = actionDispatch(useDispatch());
	const { chosenProduct } = useSelector(chosenProductRetriever);
	const { restaurant } = useSelector(restaurantRetriever);
	const [selectedSize, setSelectedSize] = React.useState<string>("");

	useEffect(() => {
		const product = new ProductService();
		product
			.getProduct(productId)
			.then((data) => setChosenProduct(data))
			.catch((err) => console.log(err));
		const member = new MemberService();
		member
			.getRestaurant()
			.then((data) => setRestaurant(data))
			.catch((err) => console.log(err));
	}, []);

	if (!chosenProduct) return null;
	return (
		<div className={"chosen-product"}>
			<Box className={"title"}>Product Detail</Box>
			<Container className={"product-container"}>
				<Stack className={"chosen-product-slider"}>
					<Swiper
						loop={true}
						spaceBetween={10}
						navigation={true}
						modules={[FreeMode, Navigation, Thumbs]}
						className="swiper-area"
					>
						{chosenProduct?.productImages.map((ele: string, index: number) => {
							const imagePath = `${serverApi}/${ele}`;
							return (
								<SwiperSlide key={index}>
									<img className="slider-image" src={imagePath} />
								</SwiperSlide>
							);
						})}
					</Swiper>
				</Stack>
				<Stack className={"chosen-product-info"}>
					<Box className={"info-box"}>
						<strong className={"product-name"}>
							{chosenProduct?.productName}
						</strong>
						
						<span className={"resto-name"}>
							{chosenProduct?.productLeftCount} items left
						</span>

						<Box className={"rating-box"}>
							<Rating name="half-rating" defaultValue={2.5} precision={0.5} />
							<div className={"evaluation-box"}>
								<div className={"product-view"}>
									<RemoveRedEyeIcon sx={{ mr: "10px" }} />
									<span>{chosenProduct?.productViews}</span>
								</div>
							</div>
						</Box>
						<div className="sidebar-sizes">
							{["Small", "Medium", "Large", "X-Large"].map((size) => (
								<div
									key={size}
									className={`size-pill ${
										selectedSize === size ? "active" : ""
									}`}
									onClick={() => setSelectedSize(size)}
								>
									{size}
								</div>
							))}
						</div>
						<p className={"product-desc"}>
							{chosenProduct?.productDesc
								? chosenProduct.productDesc
								: "No Description"}
						</p>
						<Divider height="1" width="100%" bg="#000000" />
						<div className={"product-price"}>
							<span>Price:</span>
							<span>${chosenProduct.productPrice}</span>
						</div>
						<div className={"button-box"}>
							<Button
								variant="contained"
								onClick={(e) => {
									onAdd({
										_id: chosenProduct._id,
										quantity: 1,
										name: chosenProduct.productName,
										price: chosenProduct.productPrice,
										image: chosenProduct.productImages[0],
									});
									e.stopPropagation();
								}}
							>
								Add To Basket
							</Button>
						</div>
					</Box>
				</Stack>
			</Container>
		</div>
	);
}
