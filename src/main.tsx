import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";

import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex h-screen w-full items-center justify-center bg-neutral-900 p-4">
      <Toaster position="top-center" richColors />
      <App />
    </div>
  </StrictMode>,
);
