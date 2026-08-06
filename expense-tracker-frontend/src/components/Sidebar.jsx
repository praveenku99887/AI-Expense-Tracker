import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { NavLink, useNavigate } from "react-router-dom";

const drawerWidth = 260;

const menuItems = [
  {
    title: "Dashboard",
    icon: <DashboardRoundedIcon />,
    path: "/dashboard",
  },
  {
    title: "Expenses",
    icon: <PaymentsRoundedIcon />,
    path: "/expenses",
  },
  {
    title: "Upload Statement",
    icon: <UploadFileRoundedIcon />,
    path: "/upload",
  },
  {
    title: "Profile",
    icon: <PersonRoundedIcon />,
    path: "/profile",
  },
];

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#0F172A",
          color: "#fff",
          borderRight: "none",
        },
      }}
    >
      {/* Logo */}

      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <AccountBalanceWalletRoundedIcon
            sx={{
              fontSize: 40,
              color: "#3B82F6",
            }}
          />

          <Typography
            fontWeight="bold"
            fontSize={21}
          >
            AI Expense Tracker
          </Typography>
        </Box>
      </Toolbar>

      <Divider sx={{ borderColor: "#1E293B" }} />

      {/* Menu */}

      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.title}
            component={NavLink}
            to={item.path}
            sx={{
              mx: 2,
              mb: 1,
              borderRadius: 3,

              "&.active": {
                backgroundColor: "#2563EB",
              },

              "&:hover": {
                backgroundColor: "#1D4ED8",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ borderColor: "#1E293B" }} />

      {/* Logout */}

      <List>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            mx: 2,
            my: 2,
            borderRadius: 3,

            "&:hover": {
              backgroundColor: "#DC2626",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <LogoutRoundedIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default Sidebar;