import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CryptoContext from "./Contexts/CryptoContext.jsx";
import "react-alice-carousel/lib/alice-carousel.css";
import TrendingApiContext from "./Contexts/TrendingApi.jsx";
import CryptoListContext from "./Contexts/CryptoList.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CryptoListContext>
      <TrendingApiContext>
        <CryptoContext>
          <App />
        </CryptoContext>
      </TrendingApiContext>
    </CryptoListContext>
  </StrictMode>
);
