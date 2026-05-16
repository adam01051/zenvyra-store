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

import { setChosenProduct, setStore } from "./slice";
import { Product } from "../../../lib/types/product";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retriveChosenProduct, retriveStore } from "./selector";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";

import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

const actionDispatch = (dispatch: Dispatch) => ({
  setStore: (data: Member) => dispatch(setStore(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductRetriever = createSelector(
  retriveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  }),
);

 


const storeRetriever = createSelector(retriveStore, (store) => ({
  store,
}));
interface ChosenProductProps {
  onAdd: (items: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
   const [errorToast, setErrorToast] = React.useState<string | null>(null);
  const { productId } = useParams<{ productId: string }>();
  const { setStore, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const [toastVisible, setToastVisible] = React.useState(false);
  const { store } = useSelector(storeRetriever);
  const [selectedSize, setSelectedSize] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState(1);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));
    const member = new MemberService();
    member
      .getStore()
      .then((data) => setStore(data))
      .catch((err) => console.log(err));
  }, []);

  if (!chosenProduct) return null;


  const showError = (msg: string) => {
    setErrorToast(msg);
    setTimeout(() => setErrorToast(null), 3500);
  };

  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        {chosenProduct?.productImages.length > 1 && (
          <Stack className="image-in">
            <div className="images">
              {chosenProduct.productImages.map((ele: string, index: number) => {
                const imagePath = `${serverApi}/${ele}`;

                return (
                  <div className="img-in-card" key={index}>
                    <img src={imagePath} alt={`product-${index}`} />
                  </div>
                );
              })}
            </div>
          </Stack>
        )}
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
              {chosenProduct.variants.map((ele, index) => (
                <div key={index}>{}</div>
              ))}
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

            <div className="sidebar-section-title">Choose size</div>

            <div className="sidebar-sizes">
              {chosenProduct.variants?.map((variant: any) => {
                const outOfStock = variant.stock === 0;
                return (
                  <div
                    key={variant.size}
                    className={`size-pill 
          ${selectedSize === variant.size ? "active" : ""} 
          ${outOfStock ? "out-of-stock" : ""}`}
                    onClick={() => !outOfStock && setSelectedSize(variant.size)}
                    title={
                      outOfStock ? "Out of stock" : `${variant.stock} left`
                    }
                  >
                    <span className="size-label">{variant.size}</span>
                    {!outOfStock && (
                      <span className="size-stock">{variant.stock}</span>
                    )}
                    {outOfStock && <span className="size-badge-out">✕</span>}
                  </div>
                );
              })}
            </div>
            <div className="sidebar-section-title">Description</div>
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
              <Box
                sx={{ minWidth: 110, display: "flex", alignItems: "center" }}
              >
                <div className="button-box-set">
                  <button
                    onClick={() =>
                      setQuantity((prev: number) => Math.max(1, prev - 1))
                    }
                    className="btn-plus"
                  >
                    -
                  </button>

                  <span className="qty-num">{quantity}</span>

                  <button
                    onClick={() => setQuantity((prev: number) => prev + 1)}
                    className="btn-plus"
                  >
                    +
                  </button>
                </div>
              </Box>
              <Button
                variant="contained"
                onClick={(e) => {
                  if (!selectedSize) {
                    showError("Please select a size before adding to basket");
                    return;
                  }

                  const selectedVariant = chosenProduct.variants.find(
                    (variant: any) => variant.size === selectedSize,
                  );

                  if (!selectedVariant || quantity > selectedVariant.stock) {
                    showError(
                      `Only ${selectedVariant?.stock || 0} items left in size ${selectedSize}`,
                    );
                    return;
                  }
                  onAdd({
                    _id: chosenProduct._id,
                    quantity,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                    selectedSize,
                  });
                  e.stopPropagation();
                  setQuantity(1);
                  setToastVisible(true);
                  setTimeout(() => setToastVisible(false), 3200);
                }}
              >
                Add To Basket
              </Button>
            </div>
            {toastVisible && (
              <div
                className="toast show"
                style={{ position: "fixed", bottom: 32, right: 32 }}
              >
                <div className="toast-icon">
                  <img
                    src="/icons/shopping-cart.svg"
                    style={{ width: 18, filter: "invert(1)" }}
                  />
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <span
                    style={{ fontSize: 14, fontWeight: 600, color: "#000" }}
                  >
                    Added to basket!
                  </span>
                  <span style={{ fontSize: 12, color: "#888" }}>
                    {chosenProduct.productName}
                  </span>
                </div>
                <button
                  onClick={() => setToastVisible(false)}
                  style={{
                    marginLeft: "auto",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 16,
                  }}
                >
                  ✕
                </button>
                <div className="toast-bar" />
              </div>
            )}
            {errorToast && (
              <div className="toast toast-error show">
                <div className="toast-icon toast-icon-error">
                  <span style={{ fontSize: 16, color: "#fff" }}>!</span>
                </div>
                <div className="toast-body">
                  <span className="toast-title">{errorToast}</span>
                </div>
                <button
                  className="toast-close"
                  onClick={() => setErrorToast(null)}
                >
                  ✕
                </button>
                <div className="toast-bar toast-bar-error" />
              </div>
            )}
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
