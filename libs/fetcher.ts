import axios, { AxiosRequestConfig } from "axios";
export default async function fetcher<JSON = any>(
  input: any,
  init?: Omit<AxiosRequestConfig, "baseURL" | "method" | "data">
): Promise<JSON> {
  const res = await axios.get(input, init);
  return res.data;
}
