import { Camper, CamperFilters, PaginationParams } from "@/types/camper";
import { api } from "./api";

export async function fetchCampers(
  filters?: CamperFilters,
  pagination?: PaginationParams
): Promise<Camper[]> {
  const response = await api.get<Camper[]>("/campers", {
    params: {
      ...filters,
      ...pagination,
    },
  });
  return response.data;
}

export async function getCamperById(id: string): Promise<Camper> {
  const res = await api.get<Camper>(`/campers/${id}`);
  return res.data;
}
