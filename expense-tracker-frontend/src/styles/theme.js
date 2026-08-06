import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  palette: {

    primary: {
      main: "#2563EB",
    },

    secondary: {
      main: "#64748B",
    },

    success: {
      main: "#22C55E",
    },

    warning: {
      main: "#F59E0B",
    },

    error: {
      main: "#EF4444",
    },

    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },

  },

  typography: {

    fontFamily: "Poppins, sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    }

  },

  shape: {
    borderRadius: 14,
  }

});

export default theme;