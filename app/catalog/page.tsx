"use client";

import { useEffect } from "react";
import { useCampersStore } from "@/lib/store/campersStore";
import FiltersSidebar from "@/components/Catalog/FiltersSidebar";
import CampersList from "@/components/Catalog/CampersList";
import css from "./page.module.css";

export default function CatalogPage() {
  const { fetchCampers } = useCampersStore();

  useEffect(() => {
    fetchCampers(true);
  }, [fetchCampers]);

  return (
    <main className={css.page}>
      <div className={css.container}>
        <div className={css.layout}>
          {/* Filters Sidebar */}
          <div className={css.sidebar}>
            <FiltersSidebar />
          </div>

          {/* Campers List */}
          <div className={css.content}>
            <CampersList />
          </div>
        </div>
      </div>
    </main>
  );
}
