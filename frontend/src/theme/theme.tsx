import { createTheme, responsiveFontSizes } from "@mui/material";
import { blue, green, purple, red, yellow } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: blue[500]
        },
        secondary: {
            main: purple[500]
        },
        error: {
            main: red[500]
        },
        warning: {
            main: yellow[500]
        },
        info: {
            main: blue[300]
        },
        success: {
            main: green[500]
        },
    }
})

export default responsiveFontSizes(theme);