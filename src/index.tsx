import React from "react";
import ReactDOM from "react-dom/client";

import { ReactToastifyUserFeedback } from "@Frameworks/Feedback/react-toastfy";

import Router from "@Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <>
      {new ReactToastifyUserFeedback().provider()}
      <Router />
    </>
  </React.StrictMode>
);
