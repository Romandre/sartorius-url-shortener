import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import { ShortUrlProvider } from "./context/ShortUrlContext";
import App from "./App.tsx";
import { sartorius } from "./theme";
import "./index.css";

// Fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={sartorius}>
        <ShortUrlProvider>
          <App />
        </ShortUrlProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
