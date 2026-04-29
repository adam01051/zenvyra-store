import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function Footer() {
	return (
		<div className="footer-section">
			<Container>
				{/* 1. NEWSLETTER CARD (Overlays the top of footer) */}
				<Box className="newsletter-card">
					<Box className="newsletter-text">
						STAY UP TO DATE ABOUT OUR LATEST OFFERS
					</Box>
					<Stack className="newsletter-inputs">
						<div className="input-field">
							<MailOutlineIcon sx={{ color: "rgba(0,0,0,0.4)" }} />
							<input type="text" placeholder="Enter your email address" />
						</div>
						<button className="subscribe-btn">Subscribe to Newsletter</button>
					</Stack>
				</Box>

				{/* 2. MAIN FOOTER CONTENT */}
				<Stack
					direction="row"
					justifyContent="space-between"
				
				>
					{/* Brand Info */}
					<Stack spacing={2} style={{ width: "248px" }}>
						<Box className="footer-logo">ZENVYRA</Box>
						<Box className="foot-desc-txt">
							We have clothes that suits your style and which you’re proud to
							wear. From women to men.
						</Box>
						<Box className="sns-context">
							<img src="/icons/twitter.svg" alt="twitter" />
							<img src="/icons/facebook.svg" alt="facebook" />
							<img src="/icons/instagram.svg" alt="instagram" />
							<img src="/icons/github.svg" alt="github" />
						</Box>
					</Stack>

					{/* Links Columns */}
					<Stack direction="row" spacing={10}>
						<Box className="foot-category-link">
							<Box className="foot-category-title">COMPANY</Box>
							<Link to="/about">About</Link>
							<Link to="/features">Features</Link>
							<Link to="/works">Works</Link>
							<Link to="/career">Career</Link>
						</Box>
						<Box className="foot-category-link">
							<Box className="foot-category-title">HELP</Box>
							<Link to="/support">Customer Support</Link>
							<Link to="/delivery">Delivery Details</Link>
							<Link to="/terms">Terms & Conditions</Link>
							<Link to="/privacy">Privacy Policy</Link>
						</Box>
						<Box className="foot-category-link">
							<Box className="foot-category-title">FAQ</Box>
							<Link to="/account">Account</Link>
							<Link to="/manage-deliveries">Manage Deliveries</Link>
							<Link to="/orders">Orders</Link>
							<Link to="/payments">Payments</Link>
						</Box>
						<Box className="foot-category-link">
							<Box className="foot-category-title">RESOURCES</Box>
							<Link to="/ebooks">Free eBooks</Link>
							<Link to="/tutorial">Development Tutorial</Link>
							<Link to="/blog">How to - Blog</Link>
							<Link to="/youtube">Youtube Playlist</Link>
						</Box>
					</Stack>
				</Stack>

				<div className="footer-divider"></div>

				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Box className="copyright-txt">
						Zenvyra © 2000-2023, All Rights Reserved
					</Box>
					<Box className="payment-icons">
						<img src="/icons/visa.svg" alt="visa" />
						<img src="/icons/mastercard.svg" alt="mastercard" />
						<img src="/icons/paypal.svg" alt="paypal" />
						<img src="/icons/apple-pay.svg" alt="applepay" />
						<img src="/icons/google-pay.svg" alt="googlepay" />
					</Box>
				</Stack>
			</Container>
		</div>
	);
}
