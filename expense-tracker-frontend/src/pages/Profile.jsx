import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  CircularProgress,
} from "@mui/material";

import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";

import MainLayout from "../layouts/MainLayout";
import { getProfile } from "../services/profileService";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    total_expense: 0,
    total_transactions: 0,
    total_categories: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 5,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 1100,
            borderRadius: 5,
            p: 5,
          }}
        >
          {/* Heading */}

          <Typography
            variant="h3"
            align="center"
            fontWeight="bold"
            mb={4}
          >
            My Profile
          </Typography>

          {/* Avatar */}

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mb={5}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: "#2563EB",
                fontSize: 50,
                fontWeight: "bold",
              }}
            >
              {profile.name
                ? profile.name.charAt(0).toUpperCase()
                : "U"}
            </Avatar>

            <Typography
              variant="h4"
              fontWeight="bold"
              mt={3}
            >
              {profile.name || "User"}
            </Typography>

            <Typography
              color="text.secondary"
              fontSize={18}
            >
              {profile.email}
            </Typography>
          </Box>

          {/* Statistics */}

          <Grid
            container
            spacing={4}
            justifyContent="center"
          >
            <Grid item xs={12} md={4}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <AccountBalanceWalletRoundedIcon
                  sx={{
                    fontSize: 55,
                    color: "#2563EB",
                  }}
                />

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  mt={2}
                >
                  ₹ {profile.total_expense}
                </Typography>

                <Typography color="text.secondary">
                  Total Expense
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <ReceiptLongRoundedIcon
                  sx={{
                    fontSize: 55,
                    color: "#22C55E",
                  }}
                />

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  mt={2}
                >
                  {profile.total_transactions}
                </Typography>

                <Typography color="text.secondary">
                  Transactions
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <CategoryRoundedIcon
                  sx={{
                    fontSize: 55,
                    color: "#F59E0B",
                  }}
                />

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  mt={2}
                >
                  {profile.total_categories}
                </Typography>

                <Typography color="text.secondary">
                  Categories Used
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </MainLayout>
  );
}

export default Profile;