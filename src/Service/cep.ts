import { AxiosApiConnection } from "@Frameworks/Api/axios";

const axiosApiConnection = new AxiosApiConnection();
const baseURL = "https://viacep.com.br/ws";

export {};

export interface ViaCepReturn {
  statusCode: number;
  data?: {
    bairro: string;
    cep: string;
    complemento: string;
    ddd: string;
    gia: string;
    ibge: string;
    localidade: string;
    logradouro: string;
    siafi: string;
    uf: string;
  };
}

export const findByCep = async (cep: string): Promise<ViaCepReturn> => {
  const sanitizedCep = cep.replace(".", "").replace("-", "");

  const response = await axiosApiConnection.get(
    `${baseURL}/${sanitizedCep}/json`
  );

  return response.data;
};
