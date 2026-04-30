import { Container, Stack } from "@mui/material";

export default function Statistics() {
	return (
		<div className="static-frame">
			<Container>
				<Stack className="info">
					<Stack className="static-box">
						<img src="../icons/versace.svg" alt=""></img>
					</Stack>

					<Stack className="static-box">
						<img src="../icons/zara-logo.svg" alt="2"></img>
					</Stack>

					<Stack className="static-box">
						<img src="../icons/gucci.svg" alt="3"></img>
					</Stack>

					<Stack className="static-box">
						<img src="../icons/prada.svg" alt="4"></img>
					</Stack>
					<Stack className="static-box">
						<img src="../icons/calvin.svg" alt="5"></img>
					</Stack>
				</Stack>
			</Container>
		</div>
	);
}
