import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { JsCookieManager } from "@Frameworks/Cookie/js-cookie";
import { ReactToastifyUserFeedback } from "@Frameworks/Feedback/react-toastfy";

import UserContext from "@Contexts/User";

const PrivateProvider = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const cookieManager = new JsCookieManager();
    const toaster = new ReactToastifyUserFeedback();

    const forceLogout = () => {
      userContext.email = "";
      userContext.name = "";
      userContext.token = "";

      cookieManager.deleteCookie("token");
      cookieManager.deleteCookie("name");

      toaster.error("Faça login novamente");

      navigate("/");
    };

    if (!userContext.token) {
      forceLogout();
    }
  }, [navigate, userContext]);

  return null;
};

export default PrivateProvider;
