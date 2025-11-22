'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCamperById } from '@/lib/api/campers';
import { formatPrice } from '@/lib/utils';
import type { Camper } from '@/types/camper';
import css from './page.module.css';
import Loading from '@/app/loading';
import PhotoGallery from '@/components/Camper/PhotoGallery';
import TabNavigation from '@/components/Camper/TabNavigation';
import FeaturesTab from '@/components/Camper/FeaturesTab';
import ReviewsTab from '@/components/Camper/ReviewsTab';
import BookingForm from '@/components/Camper/BookingForm';

export default function CamperDetailsPage() {
    const params = useParams();
    const [camper, setCamper] = useState<Camper | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');

    useEffect(() => {
        const fetchCamper = async () => {
            if (!params.id) return;

            setIsLoading(true);
            try {
                const data = await getCamperById(params.id as string);
                setCamper(data);
            } catch (error) {
                console.error('Error fetching camper:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCamper();
    }, [params.id]);

    if (isLoading) {
        return (
            <main className={css.page}>
                <Loading />
            </main>
        );
    }

    if (!camper) {
        return (
            <main className={css.page}>
                <div className={css.container}>
                    <h1 className={css.title}>Camper not found</h1>
                </div>
            </main>
        );
    }

    return (
        <main className={css.page}>
            <div className={css.container}>
                {/* Header */}
                <div className={css.header}>
                    <h1 className={css.title}>{camper.name}</h1>
                    <div className={css.meta}>
                        <div className={css.rating}>
                            <svg width={16} height={16} className={css.icon}>
                                <use href="/sprite.svg#icon-star" />
                            </svg>
                            <span className={css.ratingText}>
                                {camper.rating} ({camper.reviews?.length || 0} Reviews)
                            </span>
                        </div>
                        <div className={css.location}>
                            <svg width={16} height={16} className={css.icon}>
                                <use href="/sprite.svg#icon-location" />
                            </svg>
                            <span>{camper.location}</span>
                        </div>
                    </div>
                    <p className={css.price}>
                        €{formatPrice(camper.price)}
                    </p>
                </div>

                {/* Photo Gallery */}
                <div className={css.gallery}>
                    <PhotoGallery images={camper.gallery} name={camper.name} />
                </div>

                {/* Description */}
                <p className={css.description}>{camper.description}</p>

                {/* Tabs */}
                <div className={css.tabs}>
                    <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
                </div>

                {/* Tab Content and Booking Form */}
                <div className={css.content}>
                    {/* Tab Content */}
                    <div className={css.tabContent}>
                        {activeTab === 'features' ? (
                            <FeaturesTab camper={camper} />
                        ) : (
                            <ReviewsTab reviews={camper.reviews} />
                        )}
                    </div>

                    {/* Booking Form */}
                    <div className={css.bookingSection}>
                        <BookingForm />
                    </div>
                </div>
            </div>
        </main>
    );
}