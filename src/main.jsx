import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalStyle } from "./styles/global.js";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "styled-components";
import { colors, theme } from "./styles/colors.js";
import {AppProvider} from "./context/AppContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppProvider><App /></AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
