import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularProducts";
import NewDishes from "./NewProducts";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";

// @ts-ignore: allow side-effect CSS import without module declarations
import "../../../css/home.css";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewProducts, setPopularProducts, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";

import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";

//redux slice // Selector
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
  setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularProducts, setNewProducts, setTopUsers } =
    actionDispatch(useDispatch());

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        //productCollection: ProductCollection.TSHIRT,
      })
      .then((data) => {
        console.log("data passed here:", data);
        setPopularProducts(data);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        // productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        console.log("data passed here:", data);
        setNewProducts(data);
      })
      .catch((err) => console.log(err));

    const member = new MemberService();

    member
      .getTopUsers()
      .then((data) => {
        setTopUsers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <NewDishes />
      <PopularDishes />

      <Advertisement />
      <ActiveUsers />
    </div>
  );
}

//screen component  main page component  product page component  order page component

// common component --  navbar component  footer component
//  button  link button component  link component

//sectional is statistical  products  views  =
//screen  component  all sectional components

//1st integration is tye integration
