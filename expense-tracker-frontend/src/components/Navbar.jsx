import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
} from "@mui/material";

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function Navbar() {

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#FFFFFF",
        color: "#1E293B",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Left Side */}
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
          >
            Dashboard
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {today}
          </Typography>
        </Box>

        {/* Center */}
        <TextField
          placeholder="Search expenses..."
          size="small"
          sx={{
            width: 350,
            bgcolor: "#F8FAFC",
            borderRadius: 3,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Right */}
        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <IconButton>
            <Badge
              badgeContent={3}
              color="error"
            >
              <NotificationsNoneRoundedIcon />
            </Badge>
          </IconButton>

          <Box
            textAlign="right"
          >
            <Typography
              fontWeight="bold"
            >
              Praveen Kumar
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Personal Account
            </Typography>
          </Box>

          <Avatar
            sx={{
              bgcolor: "#2563EB",
            }}
          >
            P
          </Avatar>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;