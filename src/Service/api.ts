import { AxiosApiConnection } from "@Frameworks/Api/axios";

const axiosApiConnection = new AxiosApiConnection();
const baseURL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4000";

const createAccount = (data: {
  name: string;
  email: string;
  password: string;
}) => axiosApiConnection.post(`${baseURL}/users/register`, data);

const login = (data: { email: string; password: string }) =>
  axiosApiConnection.post(`${baseURL}/users/login`, data);

export { createAccount, login };
