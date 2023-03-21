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

const getUserCompanies = (
  authToken: string,
  itemsPerPage: number,
  pageNumber: number
) =>
  axiosApiConnection.get(
    `${baseURL}/companies?itemsPerPage=${itemsPerPage}&pageNumber=${pageNumber}`,
    authToken
  );

const createCompany = (
  authToken: string,
  data: { name: string; siteUrl: string; taxId: string }
) => axiosApiConnection.post(`${baseURL}/companies`, data, authToken);

const updateCompany = (
  authToken: string,
  data: { id: number; name: string; siteUrl: string; taxId: string }
) => axiosApiConnection.put(`${baseURL}/companies`, data, authToken);

const deleteCompany = (authToken: string, id: number) =>
  axiosApiConnection.delete(`${baseURL}/companies/${id}`, authToken);

const getCompanyLocals = (
  id: number,
  authToken: string,
  itemsPerPage: number,
  pageNumber: number
) =>
  axiosApiConnection.get(
    `${baseURL}/locals/${id}?itemsPerPage=${itemsPerPage}&pageNumber=${pageNumber}`,
    authToken
  );

const createLocal = (
  authToken: string,
  data: {
    name: string;
    zipcode: string;
    state: string;
    city: string;
    neighborhood: string;
    streetAddress: string;
    number?: number;
    companyId: number;
  }
) => axiosApiConnection.post(`${baseURL}/locals`, data, authToken);

const updateLocal = (
  authToken: string,
  data: {
    id: number;
    name: string;
    zipcode: string;
    state: string;
    city: string;
    neighborhood: string;
    streetAddress: string;
    number?: number;
  }
) => axiosApiConnection.put(`${baseURL}/locals`, data, authToken);

const deleteLocal = (authToken: string, id: number) =>
  axiosApiConnection.delete(`${baseURL}/locals/${id}`, authToken);

export {
  createAccount,
  login,
  getUserCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyLocals,
  createLocal,
  updateLocal,
  deleteLocal,
};
