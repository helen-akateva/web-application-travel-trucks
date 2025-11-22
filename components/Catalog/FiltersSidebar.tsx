'use client';

import { useState } from 'react';

import { BODY_TYPES, EQUIPMENT_OPTIONS } from '@/lib/constants';

import type { FilterParams } from '@/types/camper';
import css from './FiltersSidebar.module.css';
import { useCampersStore } from '@/lib/store/campersStore';
import Input from '../Ui/Input';
import Button from '../Ui/Button';

export default function FiltersSidebar() {
    const { setFilters } = useCampersStore();
    const [localFilters, setLocalFilters] = useState<FilterParams>({});

    const handleLocationChange = (value: string) => {
        setLocalFilters((prev) => ({ ...prev, location: value || undefined }));
    };

    const handleBodyTypeChange = (value: string) => {
        setLocalFilters((prev) => ({
            ...prev,
            form: prev.form === value ? undefined : value,
        }));
    };

    const handleEquipmentChange = (key: string, value?: string) => {
        setLocalFilters((prev) => ({
            ...prev,
            [key]: prev[key as keyof FilterParams] ? undefined : value !== undefined ? value : true,
        }));
    };

    const handleSearch = () => {
        setFilters(localFilters);
    };

    return (
        <aside className={css.sidebar}>
            <div className={css.content}>
                {/* Location Filter */}
                <div className={css.section}>
                    <label className={css.label}>Location</label>
                    <Input
                        type="text"
                        placeholder="City"
                        value={localFilters.location || ''}
                        onChange={(e) => handleLocationChange(e.target.value)}
                    />
                </div>

                {/* Filters */}
                <div className={`${css.section} ${css.divider}`}>
                    <h3 className={css.sectionTitle}>Filters</h3>

                    {/* Vehicle Equipment */}
                    <div className={css.section}>
                        <h4 className={css.subsectionTitle}>Vehicle equipment</h4>
                        <div className={`${css.section} ${css.subsectionDivider}`}>
                            <div className={css.grid}>
                                {EQUIPMENT_OPTIONS.map((option) => {
                                    const isActive =
                                        option.key === 'transmission'
                                            ? localFilters.transmission === option.value
                                            : localFilters[option.key as keyof FilterParams] === true;

                                    return (
                                        <button
                                            key={option.key}
                                            onClick={() =>
                                                handleEquipmentChange(
                                                    option.key,
                                                    option.key === 'transmission' ? option.value : undefined
                                                )
                                            }
                                            className={`${css.filterButton} ${isActive ? css.active : ''}`}
                                        >
                                            <svg width={32} height={32} className={css.filterIcon}>
                                                <use href={`/icons/sprite.svg#icon-${option.key.toLowerCase()}`} />
                                            </svg>
                                            <span className={css.filterLabel}>{option.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Type */}
                    <div className={css.section}>
                        <h4 className={css.subsectionTitle}>Vehicle type</h4>
                        <div className={`${css.section} ${css.subsectionDivider}`}>
                            <div className={css.grid}>
                                {BODY_TYPES.map((type) => {
                                    const isActive = localFilters.form === type.value;

                                    return (
                                        <button
                                            key={type.value}
                                            onClick={() => handleBodyTypeChange(type.value)}
                                            className={`${css.filterButton} ${isActive ? css.active : ''}`}
                                        >
                                            <svg width={32} height={32} className={css.filterIcon}>
                                                <use href={`/icons/sprite.svg#icon-${type.value.toLowerCase()}`} />
                                            </svg>
                                            <span className={css.filterLabel}>{type.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <Button
                    variant="primary"
                    onClick={handleSearch}
                    className={css.searchButton}
                >
                    Search
                </Button>
            </div>
        </aside>
    );
}