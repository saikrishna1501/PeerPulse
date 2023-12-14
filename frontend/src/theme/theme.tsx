import { createTheme, responsiveFontSizes } from "@mui/material";
import { blue, green, purple, red, yellow } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: purple[500],
    },
    error: {
      main: red[400],
    },
    warning: {
      main: yellow[500],
    },
    info: {
      main: blue[300],
    },
    success: {
      main: green[300],
    },
  },
  typography: {
    fontFamily: ["Rubik", "sans-serif"].join(""),
    fontSize: 12,
    h1: {
      fontFamily: ["Rubik", "sans-serif"].join(""),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Rubik", "sans-serif"].join(""),
      fontSize: 30,
    },
    h3: {
      fontFamily: ["Rubik", "sans-serif"].join(""),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["Rubik", "sans-serif"].join(""),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["Rubik", "sans-serif"].join(""),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["Rubik", "sans-serif"].join(""),
      fontSize: 14,
    },
  },
});

export default responsiveFontSizes(theme);
