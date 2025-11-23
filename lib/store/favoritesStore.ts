import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[];
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  toggleFavorite: (camperId: string) => void;
  isFavorite: (camperId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      hasHydrated: false,

      setHasHydrated: (state) => {
        set({ hasHydrated: state });
      },

      toggleFavorite: (camperId: string) => {
        set((state) => {
          const isFavorited = state.favorites.includes(camperId);
          return {
            favorites: isFavorited
              ? state.favorites.filter((id) => id !== camperId)
              : [...state.favorites, camperId],
          };
        });
      },

      isFavorite: (camperId: string) => {
        return get().favorites.includes(camperId);
      },
    }),
    {
      name: "traveltrucks-favorites",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
