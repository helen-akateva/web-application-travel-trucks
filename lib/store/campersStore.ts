import { create } from "zustand";
import { getCampers } from "@/lib/api/campers";
import type { Camper, FilterParams } from "@/types/camper";

interface CampersState {
  campers: Camper[];
  filters: FilterParams;
  currentPage: number;
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  fetchCampers: (resetResults?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
  setFilters: (filters: FilterParams) => void;
  resetFilters: () => void;
}

export const useCampersStore = create<CampersState>((set, get) => ({
  campers: [],
  filters: {},
  currentPage: 1,
  totalCount: 0,
  isLoading: false,
  error: null,
  hasMore: true,

  fetchCampers: async (resetResults = false) => {
    const { filters, currentPage } = get();
    const page = resetResults ? 1 : currentPage;

    set({ isLoading: true, error: null });

    try {
      const { items, total } = await getCampers(filters, page);

      set((state) => ({
        campers: resetResults ? items : [...state.campers, ...items],
        totalCount: total,
        currentPage: page,
        isLoading: false,
        hasMore:
          (resetResults ? items.length : state.campers.length + items.length) <
          total,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch campers",
        isLoading: false,
      });
    }
  },

  loadMore: async () => {
    const { hasMore, isLoading } = get();
    if (!hasMore || isLoading) return;

    set((state) => ({ currentPage: state.currentPage + 1 }));
    await get().fetchCampers(false);
  },

  setFilters: (filters: FilterParams) => {
    set({ filters, campers: [], currentPage: 1, hasMore: true });
    get().fetchCampers(true);
  },

  resetFilters: () => {
    set({ filters: {}, campers: [], currentPage: 1, hasMore: true });
    get().fetchCampers(true);
  },
}));
