import { AxiosApiConnection } from "@Frameworks/Api/axios";

const axiosApiConnection = new AxiosApiConnection();
const baseURL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4000";

export {};
