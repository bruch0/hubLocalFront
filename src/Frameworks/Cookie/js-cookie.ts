import Cookies from "js-cookie";

import { GenericCookieManager } from "@Core/Cookies";

export class JsCookieManager implements GenericCookieManager {
  setCookie = (value: string, key: string) =>
    Cookies.set(key, value, { expires: 1 });
  getCookie = (key: string) => Cookies.get(key);
  deleteCookie = (key: string) => Cookies.remove(key);
}
