import axios, { AxiosError } from "axios";

export const BASE_URL: string =
  process.env.VITE_NODE_ENV === "production" ? "production_url" : "dev_url";

export const API_V1: string = "/api/v1";

const http = axios.create();

http.defaults.baseURL = BASE_URL;

http.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        console.error(data);
        break;
      case 404:
        console.error("NOT FOUND");
        break;
      case 500:
        console.error("SERVER ERROR");
        break;
    }
  }
);

export default http;
