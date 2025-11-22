'use client';

import { useEffect } from 'react';

import css from './page.module.css';
import { useCampersStore } from '@/lib/store/campersStore';
import FiltersSidebar from '@/components/Catalog/FiltersSidebar';
import CampersList from '@/components/Catalog/CampersList';

export default function CatalogPage() {
    const { fetchCampers } = useCampersStore();

    useEffect(() => {
        // Fetch initial campers on mount
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