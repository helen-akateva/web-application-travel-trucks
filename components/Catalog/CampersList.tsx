"use client";

import { useCampersStore } from "@/lib/store/campersStore";
import CamperCard from "./CamperCard";
import css from "./CampersList.module.css";
import Loading from "@/app/loading";
import Button from "../Ui/Button";

export default function CampersList() {
  const { campers, isLoading, hasMore, loadMore } = useCampersStore();

  // Ensure campers is always an array
  const campersList = Array.isArray(campers) ? campers : [];

  if (isLoading && campersList.length === 0) {
    return <Loading />;
  }

  if (campersList.length === 0 && !isLoading) {
    return (
      <div className={css.empty}>
        <p className={css.emptyText}>
          No campers found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <div className={css.list}>
        {campersList.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className={css.loadMoreWrapper}>
          <Button
            variant="outline"
            onClick={loadMore}
            isLoading={isLoading}
            className={css.loadMoreButton}
          >
            Load more
          </Button>
        </div>
      )}

      {/* Loading indicator for pagination */}
      {isLoading && campersList.length > 0 && (
        <div className={css.loader}>
          <Loading />
        </div>
      )}
    </div>
  );
}
