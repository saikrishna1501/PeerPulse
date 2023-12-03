import React from "react";
import "./App.scss";
import AppRoutes from "./routers/AppRoutes";
import theme from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
function App() {
  return(
    <>
      <ThemeProvider theme={theme}>
        <AppRoutes/>
      </ThemeProvider>
    </>
  )
}

export default App;
