import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";

import App from "./App";

import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/typography.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
