export class GenericCookieManager {
  setCookie: (value: string, key: string) => void;
  getCookie: (key: string) => string | undefined;
  deleteCookie: (key: string) => void;
}
