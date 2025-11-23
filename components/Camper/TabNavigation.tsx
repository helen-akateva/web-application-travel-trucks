"use client";

import css from "./TabNavigation.module.css";

interface TabNavigationProps {
  activeTab: "features" | "reviews";
  onTabChange: (tab: "features" | "reviews") => void;
}

export default function TabNavigation({
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  return (
    <div className={css.tabs}>
      <button
        onClick={() => onTabChange("features")}
        className={`${css.tab} ${activeTab === "features" ? css.active : ""}`}
      >
        Features
      </button>
      <button
        onClick={() => onTabChange("reviews")}
        className={`${css.tab} ${activeTab === "reviews" ? css.active : ""}`}
      >
        Reviews
      </button>
    </div>
  );
}
