import React from "react";
import { Box, Container, Stack, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
//@ts-ignore
import "../../../css/help.css";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

export default function HelpPage() {
  const [value, setValue] = React.useState("1");

  /** HANDLERS **/
  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
		<div className={"help-page"}>
			<Container className={"help-container"}>
				<TabContext value={value}>
					<Box className={"help-menu"}>
						<Box
							sx={{
								width: "95%",
								borderBottom: "1px solid rgba(0,0,0,0.08)",
								background: "#f3f4f6",
								borderRadius: "12px",
								padding: "8px",
							}}
						>
							<Tabs
								value={value}
								onChange={handleChange}
								aria-label="help tabs"
								className={"table_list"}
								TabIndicatorProps={{
									style: { display: "none" },
								}}
								sx={{
									minHeight: "52px",
									"& .MuiTabs-flexContainer": {
										gap: "10px",
										justifyContent: "space-between",
									},
								}}
							>
								<Tab
									label="TERMS"
									value={"1"}
									sx={{
										flex: 1,
										minHeight: "44px",
										borderRadius: "10px",
										fontFamily: "Satoshi",
										fontSize: "14px",
										fontWeight: 700,
										textTransform: "none",
										color: "rgba(0,0,0,0.55)",
										background: "#ffffff",
										transition: "0.2s",
										"&.Mui-selected": {
											background: "#000000",
											color: "#ffffff",
										}
									}}
								/>

								<Tab
									label="FAQ"
									value={"2"}
									sx={{
										flex: 1,
										minHeight: "44px",
										borderRadius: "10px",
										fontFamily: "Satoshi",
										fontSize: "14px",
										fontWeight: 700,
										textTransform: "none",
										color: "rgba(0,0,0,0.55)",
										background: "#ffffff",
										transition: "0.2s",
										"&.Mui-selected": {
											background: "#000000",
											color: "#ffffff",
										}
									}}
								/>

								<Tab
									label="CONTACT"
									value={"3"}
									sx={{
										flex: 1,
										minHeight: "44px",
										borderRadius: "10px",
										fontFamily: "Satoshi",
										fontSize: "14px",
										fontWeight: 700,
										textTransform: "none",
										color: "rgba(0,0,0,0.55)",
										background: "#ffffff",
										transition: "0.2s",
										"&.Mui-selected": {
											background: "#000000",
											color: "#ffffff",
										}
									}}
								/>
							</Tabs>
						</Box>
					</Box>

					<Stack>
						<Stack className={"help-main-content"}>
							<TabPanel value={"1"}>
								<Stack className={"rules-box"}>
									<Box className={"rules-frame"}>
										{terms.map((value, number) => {
											return <p key={number}>{value}</p>;
										})}
									</Box>
								</Stack>
							</TabPanel>

							<TabPanel value={"2"}>
								<Stack className={"accordion-menu"}>
									{faq.map((value, number) => {
										return (
											<Accordion
												key={number}
												sx={{
													borderRadius: "10px",
													boxShadow: "none",
													border: "1px solid rgba(0,0,0,0.08)",
													background: "#f3f4f6",
													mb: 1.5,
													"&:before": { display: "none" },
												}}
											>
												<AccordionSummary expandIcon={<ExpandMoreIcon />}>
													<Typography
														sx={{
															fontFamily: "Satoshi",
															fontWeight: 700,
															fontSize: "15px",
														}}
													>
														{value.question}
													</Typography>
												</AccordionSummary>

												<AccordionDetails>
													<Typography
														sx={{
															fontFamily: "Satoshi",
															fontSize: "14px",
															color: "rgba(0,0,0,0.72)",
														}}
													>
														{value.answer}
													</Typography>
												</AccordionDetails>
											</Accordion>
										);
									})}
								</Stack>
							</TabPanel>

							<TabPanel value={"3"}>
								<Stack className={"admin-letter-box"}>
									<Stack
										className={"admin-letter-container"}
										sx={{
											background: "#f3f4f6",
											borderRadius: "14px",
											padding: "30px",
											border: "1px solid rgba(0,0,0,0.06)",
										}}
									>
										<Box className={"admin-letter-frame"}>
											<span
												style={{
													fontSize: "28px",
													fontWeight: 800,
													fontFamily: "Integral CF",
												}}
											>
												Contact us!
											</span>

											<p
												style={{
													marginTop: "10px",
													color: "rgba(0,0,0,0.6)",
													fontFamily: "Satoshi",
												}}
											>
												Fill out the form below to send a message.
											</p>
										</Box>

										<form
											action={"#"}
											method={"POST"}
											className={"admin-letter-frame"}
										>
											<div className={"admin-input-box"}>
												<label>Your name</label>
												<input
													type={"text"}
													name={"memberNick"}
													placeholder={"Type your name here"}
												/>
											</div>

											<div className={"admin-input-box"}>
												<label>Your email</label>
												<input
													type={"text"}
													name={"memberEmail"}
													placeholder={"Type your email here"}
												/>
											</div>

											<div className={"admin-input-box"}>
												<label>Message</label>
												<textarea
													name={"memberMsg"}
													placeholder={"Your message"}
												></textarea>
											</div>

											<Box
												display={"flex"}
												justifyContent={"flex-end"}
												sx={{ mt: "30px" }}
											>
												<Button
													type={"submit"}
													variant="contained"
													sx={{
														height: "46px",
														padding: "0 24px",
														borderRadius: "10px",
														background: "#000000",
														color: "#ffffff",
														fontFamily: "Satoshi",
														fontWeight: 700,
														textTransform: "none",
														boxShadow: "none",
														"&:hover": {
															background: "#1a1a1a",
														},
													}}
												>
													Send
												</Button>
											</Box>
										</form>
									</Stack>
								</Stack>
							</TabPanel>
						</Stack>
					</Stack>
				</TabContext>
			</Container>
		</div>
	);
}
