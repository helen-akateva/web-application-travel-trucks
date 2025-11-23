import axios from "axios";
import { API_BASE_URL, ITEMS_PER_PAGE } from "../constants";
import type { Camper, FilterParams } from "@/types/camper";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function buildFilterParams(filters: FilterParams, page: number = 1) {
  const params: Record<string, string | number | boolean> = {
    page,
    limit: ITEMS_PER_PAGE,
  };

  if (filters.location) {
    params.location = filters.location;
  }

  if (filters.form) {
    params.form = filters.form;
  }

  const equipmentKeys: (keyof FilterParams)[] = [
    "AC",
    "kitchen",
    "bathroom",
    "TV",
    "radio",
    "refrigerator",
    "microwave",
    "gas",
    "water",
  ];

  equipmentKeys.forEach((key) => {
    if (filters[key] === true) {
      params[key] = true;
    }
  });

  if (filters.transmission) {
    params.transmission = filters.transmission;
  }

  return params;
}

export async function getCampers(
  filters: FilterParams = {},
  page: number = 1
): Promise<{ items: Camper[]; total: number }> {
  try {
    const params = buildFilterParams(filters, page);

    const response = await api.get<{ total: number; items: Camper[] }>(
      "/campers",
      { params }
    );

    const { items = [], total = 0 } = response.data || {};

    return { items: Array.isArray(items) ? items : [], total };
  } catch {
    return { items: [], total: 0 };
  }
}

export async function getCamperById(id: string): Promise<Camper> {
  try {
    const response = await api.get<Camper>(`/campers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
