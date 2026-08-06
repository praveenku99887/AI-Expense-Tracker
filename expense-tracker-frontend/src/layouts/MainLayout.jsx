import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#F4F7FC",
      }}
    >
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 4,
          py: 4,
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default MainLayout;