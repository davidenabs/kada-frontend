import { IParams } from "@/interface/client";
import { decryptData } from "@/utils/utils";
import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  const encryptedData = localStorage.getItem("kada-user");
  const data = encryptedData ? decryptData(encryptedData) : null;

  const user = data && JSON.parse(data);
  const token = user && user.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // logout
    }
    return Promise.reject(error.response.data);
  }
);

export class ApiClient {
  static async get<T>(url: string, params?: IParams) {
    const response = await client.get<T>(url, {
      params,
    });
    return response.data;
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    const response = await client.post<T>(url, data, options);
    return response.data;
  }

  static async put<T>(url: string, data: unknown, options?: any) {
    const response = await client.put<T>(url, data, options);
    return response.data;
  }

  static async patch<T>(url: string, data: unknown, options?: any) {
    const response = await client.patch<T>(url, data);
    return response.data;
  }

  static async delete<T>(url: string) {
    const response = await client.delete<T>(url);
    return response.data;
  }
}
