import axios from "axios";

import { type GenericApiConnection } from "@Core/Api";

export class AxiosApiConnection implements GenericApiConnection {
  get = async (url: string, token?: string) => {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token ?? ""}` },
    });

    return { data: { statusCode: response.status, content: response.data } };
  };

  post = async (url: string, data: any, token?: string) => {
    const response = await axios.post(url, data, {
      headers: { Authorization: `Bearer ${token ?? ""}` },
    });

    return { data: { statusCode: response.status, content: response.data } };
  };

  put = async (url: string, data: any, token?: string) => {
    const response = await axios.put(url, data, {
      headers: { Authorization: `Bearer ${token ?? ""}` },
    });

    return { data: { statusCode: response.status, content: response.data } };
  };

  delete = async (url: string, token?: string) => {
    const response = await axios.delete(url, {
      headers: { Authorization: `Bearer ${token ?? ""}` },
    });

    return { data: { statusCode: response.status, content: response.data } };
  };
}
