import { createContext } from "react";

import { JsCookieManager } from "@Frameworks/Cookie/js-cookie";

const cookieManager = new JsCookieManager();

const name = cookieManager.getCookie("name");
const token = cookieManager.getCookie("token");

const UserContext = createContext({
  email: "",
  name: name || "",
  token: token || "",
});

export default UserContext;
