import { IFarm } from "@/interface/farm";
import API_ENDPOINTS from "../_api/client/endpoint";
import { authAxios } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getFarmById = async (id: string): Promise<IFarm> => {
  const { data } = await authAxios.get(
    `${API_ENDPOINTS.GET_FARM.replace(":id", id)}`
  );
  return data;
};
