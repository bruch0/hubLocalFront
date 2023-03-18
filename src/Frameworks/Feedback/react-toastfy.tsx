import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GenericUserFeedback } from "@Core/Feedback";

export class ReactToastifyUserFeedback implements GenericUserFeedback {
  error = (message: string) => toast.error(message);
  success = (message: string) => toast.success(message);
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
