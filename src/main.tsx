import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex h-screen w-full items-center justify-center bg-neutral-900 p-4">
      <App />
    </div>
  </StrictMode>,
);
