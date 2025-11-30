import { createTheme } from "@mui/material/styles"

export const lightTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#dc004e",
      light: "#f73378",
      dark: "#9a0035",
      contrastText: "#fff",
    },
    background: {
      default: "#fafafa",
      paper: "#fff",
    },
  },
})
