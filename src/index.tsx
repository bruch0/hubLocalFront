import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "@Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <>
      <ToastContainer
        hideProgressBar={true}
        autoClose={1000}
        theme="colored"
        pauseOnHover={false}
        closeOnClick={true}
      />
      <Router />
    </>
  </React.StrictMode>
);
