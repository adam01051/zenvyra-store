import { Route, Switch, useLocation } from "react-router-dom";

import ProductsPage from "./screens/productsPage/index";
import OrdersPage from "./screens/ordersPage";
import HomePage from "./screens/homePage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/products.css";
import "../css/otherNavbar.css";
import HelpPage from "./screens/helpPage";
import UserPage from "./screens/userPage";
import useBasket from "./hooks/useBasket";
import { useState } from "react";
import AuthenticationModal from "./components/auth";
import { T } from "../lib/types/common";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { Messages } from "../lib/config";
import MemberService from "./services/MemberService";
import { useGlobals } from "./hooks/useGlobals";

function App() {
	const location = useLocation();
	const {setAuthMember } = useGlobals();
	const { cartItems, onAdd, onDelete, onRemove, onDeleteAll } = useBasket();

	const [signupOpen, setSignupOpen] = useState<boolean>(false);
	const [loginOpen, setLoginOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);


	const handleSignupClose = () => setSignupOpen(false);
	const handleLoginClose = () => setLoginOpen(false);


	const handleLogoutClick = (e: T) => {
		setAnchorEl(e.currentTarget);
	};
	const handleCloseLogout = () => {
		setAnchorEl(null);
	};
	const handleLogoutRequest = async () => {
		try {
			const member = new MemberService();
			await member.logout();
			await sweetTopSuccessAlert("success", 1000);
			
		} catch (error) {
			console.log(error);
			sweetErrorHandling(Messages.error1);
			setAuthMember(null);
		}
	};
	

	return (
		<>
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
			<Footer />
			<AuthenticationModal
				signupOpen={signupOpen}
				loginOpen={loginOpen}
				handleLoginClose={handleLoginClose}
				handleSignupClose={handleSignupClose}
			/>
		</>
	);
}

export default App;

//declarative component
