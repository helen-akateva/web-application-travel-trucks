import { Camper, CamperFilters } from "@/types/camper";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CampersState {
  campers: Camper[];
  filters: CamperFilters;
  favorites: string[];
  loading: boolean;
  error: string | null;
  setCampers: (campers: Camper[]) => void;
  setFilters: (filters: CamperFilters) => void;
  clearFilters: () => void;
  toggleFavorite: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCampersStore = create<CampersState>()(
  persist(
    (set) => ({
      campers: [],
      filters: {},
      favorites: [],
      loading: false,
      error: null,

      setCampers: (campers) => set({ campers }),

      setFilters: (filters) => set({ filters, campers: [] }),

      clearFilters: () => set({ filters: {}, campers: [] }),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({ error }),
    }),
    {
      name: "campers-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
