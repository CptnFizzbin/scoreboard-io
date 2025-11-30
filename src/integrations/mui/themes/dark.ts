import { createTheme } from "@mui/material/styles"

export const darkTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
      light: "#e3f2fd",
      dark: "#1976d2",
      contrastText: "#000",
    },
    secondary: {
      main: "#f48fb1",
      light: "#f8bbd0",
      dark: "#c2185b",
      contrastText: "#000",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
})
