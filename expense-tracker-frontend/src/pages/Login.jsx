import { useEffect, useState } from "react";
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
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loginUser } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }

  }, []);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const data = await loginUser(email, password);

      localStorage.setItem("token", data.access_token);

      toast.success("Login Successful");

      setTimeout(() => {

        navigate("/dashboard");

      }, 1000);

    } catch (error) {

      toast.error(
        error.response?.data?.detail ||
        "Invalid Email or Password"
      );

    }

  };

  return (
    <>

      <ToastContainer position="top-right" autoClose={2000} />

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
          elevation={12}
          sx={{
            width: 430,
            borderRadius: 5,
            p: 5,
          }}
        >

          <Box
            display="flex"
            justifyContent="center"
          >

            <Avatar
              sx={{
                bgcolor: "#1565C0",
                width: 75,
                height: 75,
              }}
            >
              <AccountBalanceWalletIcon
                sx={{
                  fontSize: 42,
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
            AI Expense Tracker
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            mb={4}
          >
            Smart Personal Finance Assistant
          </Typography>

          <form onSubmit={handleLogin}>

            <TextField
              fullWidth
              label="Email Address"
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

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 4,
                height: 50,
                borderRadius: 3,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Login
            </Button>

            <Button
              component={Link}
              to="/register"
              fullWidth
              variant="outlined"
              startIcon={
                <PersonAddAlt1RoundedIcon />
              }
              sx={{
                mt: 2,
                height: 50,
                borderRadius: 3,
                fontWeight: "bold",
              }}
            >
              Create New Account
            </Button>

          </form>

          <Typography
            align="center"
            mt={3}
          >
            Don't have an account?{" "}

            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "#1565C0",
                fontWeight: "bold",
              }}
            >
              Register Here
            </Link>

          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            mt={4}
          >
          </Typography>

        </Paper>

      </Box>

    </>
  );

}

export default Login;