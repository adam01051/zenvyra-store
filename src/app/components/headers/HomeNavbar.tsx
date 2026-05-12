import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";

import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";
import Divider from "../../components/divider";

interface HomeNavbarProps {
	cartItems: CartItem[];
	onAdd: (item: CartItem) => void;
	onDelete: (item: CartItem) => void;
	onRemove: (item: CartItem) => void;
	onDeleteALl: () => void;
	setSignupOpen: (isOpen: boolean) => void;
	setLoginOpen: (isOpen: boolean) => void;
	handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
	handleCloseLogout: () => void;
	anchorEl: HTMLElement | null;
	handleLogoutRequest: () => void;
}

export default function HomeNavbar(props:HomeNavbarProps) {
	const {
		cartItems,
		onAdd,
		onDelete,
		onRemove,
		onDeleteALl,
		setSignupOpen,
		setLoginOpen,
		anchorEl,
		handleLogoutClick,
		handleCloseLogout,
		handleLogoutRequest
	} = props;
	const { authMember } = useGlobals();


	return (
		<div className="home-navbar">
			<div className="navbar">
				<Stack className="menu">
					<Box>
						<NavLink to="/">
							<div className="nav-left">
								<a href="/admin" className="logo">
									ZENVYRA
								</a>
							</div>
						</NavLink>
					</Box>
					<Stack className="links">
						<Box className={"hover-line"}>
							<NavLink to="/" activeClassName={"underline"}>
								Home
							</NavLink>
						</Box>
						<Box className={"hover-line"}>
							<NavLink to="/products" activeClassName={"underline"}>
								Products
							</NavLink>
						</Box>
						{authMember ? (
							<Box className={"hover-line"}>
								<NavLink to="/orders" activeClassName={"underline"}>
									Orders
								</NavLink>
							</Box>
						) : null}
						{authMember ? (
							<Box className={"hover-line"}>
								<NavLink to="/member-page" activeClassName={"underline"}>
									My Page
								</NavLink>
							</Box>
						) : null}

						<Box className={"hover-line"}>
							<NavLink to="/help" activeClassName={"underline"}>
								Help
							</NavLink>
						</Box>
						{/* basket */}
						<Basket
							cartItems={cartItems}
							onAdd={onAdd}
							onRemove={onRemove}
							onDelete={onDelete}
							onDeleteAll={onDeleteALl}
						/>
						<Box>
							<div> </div>
						</Box>

						{!authMember ? (
							<Box>
								<Button
									variant="contained"
									className="login-button"
									onClick={() => setLoginOpen(true)}
								>
									Login
								</Button>
							</Box>
						) : (
							<img
								className="user"
								src={
									authMember?.memberImage
										? `${serverApi}/${authMember.memberImage}`
										: "/icons/user-icon.svg"
								}
								alt="avatarPic"
								onClick={handleLogoutClick}
							/>
						)}

						<Menu
							anchorEl={anchorEl}
							id="account-menu"
							open={Boolean(anchorEl)}
							onClose={handleCloseLogout}
							onClick={handleCloseLogout}
							PaperProps={{
								elevation: 0,
								sx: {
									overflow: "visible",
									filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
									mt: 1.5,
									"& .MuiAvatar-root": {
										width: 32,
										height: 32,
										ml: -0.5,
										mr: 1,
									},
									"&:before": {
										content: '""',
										display: "block",
										position: "absolute",
										top: 0,
										right: 14,
										width: 10,
										height: 10,
										bgcolor: "background.paper",
										transform: "translateY(-50%) rotate(45deg)",
										zIndex: 0,
									},
								},
							}}
							transformOrigin={{ horizontal: "right", vertical: "top" }}
							anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
						>
							<MenuItem onClick={handleLogoutRequest}>
								<ListItemIcon>
									<Logout fontSize="small" style={{ color: "blue" }} />
								</ListItemIcon>
								Logout
							</MenuItem>
						</Menu>
					</Stack>
				</Stack>
			</div>
			<div className="navbar-container">
				<Stack className={"header-frame"}>
					<Stack className={"detail"}>
						<Box className={"head-main-txt"}>
							FIND CLOTHES THAT MATCHES YOUR STYLE
						</Box>
						<Box className={"wel-txt"}>
							Browse through our diverse range of meticulously crafted garments,
							designed to bring out your individuality and cater to your sense
							of style.
						</Box>

						<Box className={"signup"}>
							{!authMember ? (
								<Button
									variant="contained"
									className="signup-button"
									onClick={() => setSignupOpen(true)}
								>
									SIGN UP
								</Button>
							) : null}
						</Box>

						<Stack className="info">
							<Stack className="static-box">
								<Box className="static-num">12</Box>
								<Box className="static-text">International-brands</Box>
							</Stack>
							<Divider height="64" width="2" bg="#0000001A" />
							<Stack className="static-box">
								<Box className="static-num">8</Box>
								<Box className="static-text">Experience</Box>
							</Stack>
							<Divider height="64" width="2" bg="#0000001A" />
							<Stack className="static-box">
								<Box className="static-num">50+</Box>
								<Box className="static-text">High-Quality Products</Box>
							</Stack>
						</Stack>
					</Stack>
				</Stack>

				<Stack></Stack>
			</div>
		</div>
	);
}
