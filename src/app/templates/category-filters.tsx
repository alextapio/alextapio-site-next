"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import styles from "./page.module.css";

type CategoryFiltersProps = {
  children: ReactNode;
  initiallyOpen: boolean;
};

export default function CategoryFilters({
  children,
  initiallyOpen,
}: CategoryFiltersProps) {
  const [open, setOpen] = useState(initiallyOpen);

  return (
    <div className={styles.filterArea}>
      <div className={styles.titleRow}>
        <h1 id="templates-title">Business plans</h1>
        <button
          className={styles.filterToggle}
          type="button"
          aria-label="Filter business plans"
          aria-expanded={open}
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          <svg aria-hidden="true" viewBox="0 0 20 20">
            <path d="M3 5h14M5.5 10h9M8 15h4" />
          </svg>
        </button>
      </div>
      {open && children}
    </div>
  );
}
