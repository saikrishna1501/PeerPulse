import React from "react";
import "./App.scss";
import AppRoutes from "./routers/AppRoutes";
import theme from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import configureMyStore from "./store/configureStore";
import { Provider } from "react-redux";

const store = configureMyStore();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
