import { Route, Switch, useLocation } from "react-router-dom";
import { useState } from "react";

import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import HomePage from "./screens/homePage";
import HelpPage from "./screens/helpPage";
import UserPage from "./screens/userPage";

import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import AuthenticationModal from "./components/auth";

import useBasket from "./hooks/useBasket";
import { useGlobals } from "./hooks/useGlobals";

import MemberService from "./services/MemberService";

import { T } from "../lib/types/common";
import {
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../lib/sweetAlert";
import { Messages } from "../lib/config";

/* CSS */
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/products.css";
import "../css/otherNavbar.css";

function App() {
  const location = useLocation();

  const { setAuthMember } = useGlobals();

  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
  } = useBasket();

  /* ================= AUTH MODAL STATES ================= */

  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  const handleSignupOpen = () => setSignupOpen(true);
  const handleSignupClose = () => setSignupOpen(false);

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  /* ================= MENU STATES ================= */

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(
    null
  );

  const handleLogoutClick = (e: T) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseLogout = () => {
    setAnchorEl(null);
  };

  /* ================= LOGOUT ================= */

  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();

      await member.logout();

      setAuthMember(null);

      handleCloseLogout();

      await sweetTopSuccessAlert("success", 1000);
    } catch (error) {
      console.log(error);
      sweetErrorHandling(Messages.error1);
    }
  };

  /* ================= UI ================= */

  return (
    <>
      {/* NAVBAR */}
      {location.pathname === "/" ? (
        <HomeNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteALl={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      ) : (
        <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      )}

      {/* ROUTES */}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>

        <Route path="/orders">
          <OrdersPage />
        </Route>

        <Route path="/member-page">
          <UserPage />
        </Route>

        <Route path="/help">
          <HelpPage />
        </Route>

        <Route path="/">
          <HomePage />
        </Route>
      </Switch>

      {/* FOOTER */}
      <Footer />

      {/* AUTH MODAL */}
      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleSignupClose={handleSignupClose}
        handleLoginClose={handleLoginClose}
        handleSignupOpen={handleSignupOpen}
        handleLoginOpen={handleLoginOpen}
      />
    </>
  );
}

export default App;