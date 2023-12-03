import React from "react";
import "./App.scss";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import theme from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
function App() {
  return(
    <div>
      <ThemeProvider theme={theme}>
        <AppRoutes/>
      </ThemeProvider>
    </div>
  )
}

export default App;
