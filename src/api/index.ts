import axios, { AxiosHeaders } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status === 401) {
      localStorage.clear();
    }

    return Promise.reject(error);
  },
);

interface ApiProps {
  url: string;
  method: string;
  data?: unknown;
  headers?: AxiosHeaders;
  responseType?: "blob" | "json";
}

export default class Api {
  private api = async <T>({ headers, method, url, data }: ApiProps) => {
    try {
      const response = await axios.request<T>({
        method,
        url,
        data,
        headers,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response?.data;
        }

        return error?.response;
      }

      return error as T;
    }
  };

  public post = async <T>(
    url: string,
    data: unknown,
    headers?: any,
  ): Promise<T> => await this.api({ method: "POST", url, data, headers });

  public get = async <T>(url: string, headers?: any): Promise<T> =>
    await this.api({ method: "GET", url, headers });

  public delete = async <T>(url: string): Promise<T> =>
    await this.api({ method: "DELETE", url });

  public patch = async <T>(url: string, data: unknown): Promise<T> =>
    await this.api({
      method: "PATCH",
      url,
      data,
    });
}
