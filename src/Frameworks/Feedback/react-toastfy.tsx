import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { type GenericUserFeedback } from "@Core/Feedback";

export class ReactToastifyUserFeedback implements GenericUserFeedback {
  error = (message: string) =>
    toast.error(message, {
      toastId: 1,
    });

  success = (message: string) =>
    toast.success(message, {
      toastId: 2,
    });

  provider = () => (
    <ToastContainer
      hideProgressBar={true}
      autoClose={1000}
      theme="colored"
      pauseOnHover={false}
      closeOnClick={true}
    />
  );
}
