import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./fonts/DMSans.ttf";
import "./fonts/Eighties.ttf";
import "./index.css";
import "./reset.css";

// 00AEEF
// EC008C

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
