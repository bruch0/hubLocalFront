import { createContext } from "react";

import { JsCookieManager } from "@Frameworks/Cookie/js-cookie";

const cookieManager = new JsCookieManager();

const name = cookieManager.getCookie("name");
const token = cookieManager.getCookie("token");
const userCompanies: Array<{ id: number; name: string }> = JSON.parse(
  cookieManager.getCookie("userCompanies") ?? JSON.stringify("")
);

const UserContext = createContext({
  email: "",
  name: name ?? "",
  token: token ?? "",
  userCompanies: userCompanies || [],
});

export default UserContext;
