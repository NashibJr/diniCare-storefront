import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import TanstackProvider from "./api/TanstackProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./lib/store";
import ReduxProvider from "./lib/ReduxProvider";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TanstackProvider>
      <PersistGate persistor={persistor}>
        <ReduxProvider>
          <App />
          <Toaster />
        </ReduxProvider>
      </PersistGate>
    </TanstackProvider>
  </React.StrictMode>,
);
