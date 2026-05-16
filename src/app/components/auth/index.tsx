import React, { useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Fab,
  Stack,
  TextField,
  Box,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import styled from "styled-components";

import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

/* ================= STYLED IMAGE ================= */
const ModalImg = styled.div`
  width: 46%;
  min-height: 100%;
  background-image: url("/img/auth.webp");
  background-size: cover;
  background-position: center;
  position: relative;
`;

/* ================= TYPES ================= */
interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
  handleLoginOpen: () => void;
  handleSignupOpen: () => void;
}

/* ================= COMPONENT ================= */
export default function AuthenticationModal(
  props: AuthenticationModalProps
) {
  const {
    signupOpen,
    loginOpen,
    handleSignupClose,
    handleLoginClose,
    handleLoginOpen,
    handleSignupOpen,
  } = props;

  const { setAuthMember } = useGlobals();

  const [memberNick, setMemberNick] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberPassword, setMemberPassword] = useState("");

  /* ================= HANDLERS ================= */

  const handleUserName = (e: T) => setMemberNick(e.target.value);
  const handlePhone = (e: T) => setMemberPhone(e.target.value);
  const handlePassword = (e: T) => setMemberPassword(e.target.value);

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest();
    }

    if (e.key === "Enter" && loginOpen) {
      handleLoginRequest();
    }
  };

  /* ================= SIGNUP ================= */

const handleSignupRequest = async () => {
  try {
    if (!memberNick.trim()) {
		 handleSignupClose();
      return sweetErrorHandling("Username is required");
	 
    }

    if (!memberPhone.trim()) {
		 handleSignupClose();
      return sweetErrorHandling("Phone number is required");
	 
    }

    if (!memberPassword.trim()) {
		 handleSignupClose();
      return sweetErrorHandling("Password is required");

    }

    if (memberPassword.length < 3) {
		 handleSignupClose();
      return sweetErrorHandling("Password must be at least 6 characters");

    }

    const input: MemberInput = {
      memberNick,
      memberPhone,
      memberPassword,
    };

    const member = new MemberService();
    const result = await member.signup(input);

    setAuthMember(result);
    handleSignupClose();
  } catch (error) {
	handleSignupClose();
    sweetErrorHandling(error);
  }
};

  /* ================= LOGIN ================= */

const handleLoginRequest = async () => {
  try {
    if (!memberNick.trim()) {
		 handleLoginClose();
      return sweetErrorHandling("Username is required");
    }

    if (!memberPassword.trim()) {
		handleLoginClose();
      return sweetErrorHandling("Password is required");
    }

    const input: LoginInput = {
      memberNick,
      memberPassword,
    };

    const member = new MemberService();
    const result = await member.login(input);

    setAuthMember(result);
    handleLoginClose();
  } catch (error) {
	 handleLoginClose();
    sweetErrorHandling(error);
  }
};

  /* ================= UI ================= */

  const AuthLayout = (
    title: string,
    subtitle: string,
    buttonText: string,
    showPhone: boolean,
    submitFunc: () => void,
    switchText: string,
    switchActionText: string,
    switchAction: () => void
  ) => (
    <Stack
      direction={"row"}
      sx={{
        width: "920px",
        maxWidth: "96%",
        minHeight: "580px",
        bgcolor: "#fff",
        borderRadius: "28px",
        overflow: "hidden",
        boxShadow: "0 40px 90px rgba(0,0,0,0.20)",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* LEFT SIDE */}
      <ModalImg>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.58))",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            left: 35,
            bottom: 40,
            color: "#fff",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              fontSize: "42px",
              fontWeight: 900,
              lineHeight: 1,
              fontFamily: "sans-serif",
            }}
          >
            Zenvyra
          </Box>

          <Box sx={{ mt: 2, fontSize: "15px", opacity: 0.92 }}>
            Discover timeless fashion for every season.
          </Box>
        </Box>
      </ModalImg>

      {/* RIGHT SIDE */}
      <Stack
        sx={{
          width: "54%",
          px: "56px",
          py: "48px",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            fontSize: "34px",
            fontWeight: 900,
            color: "#000",
            lineHeight: 1.1,
          }}
        >
          {title}
        </Box>

        <Box
          sx={{
            mt: 1,
            mb: 4,
            color: "#777",
            fontSize: "15px",
          }}
        >
          {subtitle}
        </Box>

        {/* USERNAME */}
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          onChange={handleUserName}
            InputLabelProps={{
    style: {
      color: "#888",
    },
  }}
          sx={{
            mb: 2.2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
              bgcolor: "#f6f6f6",
              color: "rgba(0,0,0,0.65)",
            },
            
          }}
        />

        {/* PHONE */}
        {showPhone && (
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
              InputLabelProps={{
    style: {
      color: "#888",
    },
  }}
            onChange={handlePhone}
            sx={{
              mb: 2.2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                bgcolor: "#f6f6f6",
              },
            }}
          />
        )}

        {/* PASSWORD */}
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          onChange={handlePassword}
          onKeyDown={handlePasswordKeyDown}
            InputLabelProps={{
    style: {
      color: "#888",
    },
  }}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",
              bgcolor: "#f6f6f6",
            },
          }}
        />

        {/* BUTTON */}
        <Fab
          variant="extended"
          onClick={submitFunc}
          sx={{
            width: "100%",
            height: "56px",
            borderRadius: "999px",
            bgcolor: "#000",
            color: "#fff",
            fontWeight: 700,
            fontSize: "15px",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#222",
              boxShadow: "none",
            },
          }}
        >
          <LoginIcon sx={{ mr: 1 }} />
          {buttonText}
        </Fab>

        {/* SWITCH */}
        <Box
          sx={{
            mt: 3,
            textAlign: "center",
            fontSize: "14px",
            color: "#777",
          }}
        >
          {switchText}{" "}
          <span
            style={{
              color: "#000",
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={switchAction}
          >
            {switchActionText}
          </span>
        </Box>
      </Stack>
    </Stack>
  );

  return (
    <>
      {/* ================= SIGNUP ================= */}
      <Modal
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backgroundColor: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(7px)",
         
            },
          },
        }}
      >
        <Fade in={signupOpen}>
          <Box>
            {AuthLayout(
              "CREATE ACCOUNT",
              "Join Zenvyra and upgrade your wardrobe.",
              "Create Account",
              true,
              handleSignupRequest,
              "Already have an account?",
              "Login",
              () => {
                handleSignupClose();
                handleLoginOpen();
              }
            )}
          </Box>
        </Fade>
      </Modal>

      {/* ================= LOGIN ================= */}
      <Modal
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backgroundColor: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(7px)",
            },
          },
        }}
      >
        <Fade in={loginOpen}>
          <Box>
            {AuthLayout(
              "WELCOME BACK",
              "Login to continue shopping premium fashion.",
              "Login",
              false,
              handleLoginRequest,
              "Don't have an account?",
              "Signup",
              () => {
                handleLoginClose();
                handleSignupOpen();
              }
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}