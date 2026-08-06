import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  InputAdornment,
  IconButton,
} from "@mui/material";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { registerUser } from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {

      toast.error("Passwords do not match");

      return;

    }

    try {

      await registerUser({
        name,
        email,
        password,
      });

      toast.success("Registration Successful");

      setTimeout(() => {

        navigate("/login");

      }, 1200);

    } catch (error) {

      toast.error(
        error.response?.data?.detail ||
        "Registration Failed"
      );

    }

  };

  return (

    <>

      <ToastContainer />

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#1565C0,#42A5F5,#90CAF9)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >

        <Paper
          elevation={10}
          sx={{
            width: 450,
            p: 5,
            borderRadius: 5,
          }}
        >

          <Box display="flex" justifyContent="center">

            <Avatar
              sx={{
                bgcolor: "#1565C0",
                width: 70,
                height: 70,
              }}
            >

              <AccountBalanceWalletIcon
                sx={{
                  fontSize: 40,
                }}
              />

            </Avatar>

          </Box>

          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            mt={2}
          >
            Create Account
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            mb={4}
          >
            Smart Personal Finance Assistant
          </Typography>

          <form onSubmit={handleRegister}>

            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <TextField
              fullWidth
              label="Password"
              margin="normal"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">

                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >

                      {showPassword
                        ? <VisibilityOff />
                        : <Visibility />}

                    </IconButton>

                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              margin="normal"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 4,
                height: 50,
                borderRadius: 3,
                fontWeight: "bold",
              }}
            >
              Register
            </Button>

            <Button
              component={Link}
              to="/login"
              fullWidth
              variant="outlined"
              startIcon={<LoginRoundedIcon />}
              sx={{
                mt: 2,
                height: 50,
                borderRadius: 3,
              }}
            >
              Back to Login
            </Button>

          </form>

        </Paper>

      </Box>

    </>

  );

}

export default Register;