"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Camper } from "@/types/camper";
import css from "./CamperCard.module.css";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import Button from "../Ui/Button";

interface CamperCardProps {
  camper: Camper;
}

// Icon mapping for features
const FEATURE_ICON_MAP: Record<string, string> = {
  automatic: 'automatic',
  manual: 'automatic',
  petrol: 'petrol',
  diesel: 'petrol',
  AC: 'ac',
  Kitchen: 'kitchen',
  Bathroom: 'shower',
  TV: 'tv',
  Radio: 'radio',
};

export default function CamperCard({ camper }: CamperCardProps) {
  const { toggleFavorite, isFavorite, hasHydrated } = useFavoritesStore();

  const favorite = isFavorite(camper.id);

  // Get key features to display
  const features = [];
  if (camper.transmission) features.push({ label: camper.transmission, icon: FEATURE_ICON_MAP[camper.transmission] || 'automatic' });
  if (camper.engine) features.push({ label: camper.engine, icon: FEATURE_ICON_MAP[camper.engine] || 'petrol' });
  if (camper.AC) features.push({ label: "AC", icon: 'ac' });
  if (camper.kitchen) features.push({ label: "Kitchen", icon: 'kitchen' });
  if (camper.bathroom) features.push({ label: "Bathroom", icon: 'shower' });

  // Get image URL from gallery
  const imageUrl =
    camper.gallery?.[0]?.thumb ||
    camper.gallery?.[0]?.original ||
    "/placeholder-camper.jpg";

  return (
    <div className={css.card}>
      <div className={css.cardContent}>
        {/* Image */}
        <div className={css.imageWrapper}>
          <div className={css.image}>
            <Image
              src={imageUrl}
              alt={camper.name}
              fill
              className={css.image}
            />
          </div>
        </div>

        {/* Content */}
        <div className={css.content}>
          {/* Header */}
          <div className={css.header}>
            <h3 className={css.title}>{camper.name}</h3>
            <div className={css.priceWrapper}>
              <span className={css.price}>€{formatPrice(camper.price)}</span>
              {hasHydrated && (
                <button
                  onClick={() => toggleFavorite(camper.id)}
                  className={css.favoriteButton}
                  aria-label={
                    favorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <svg width={26} height={24} className={`${css.icon} ${favorite ? css.favoriteActive : ''}`}>
                    <use href="/sprite.svg#icon-property" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Meta */}
          <div className={css.meta}>
            <div className={css.rating}>
              <svg width={16} height={16} className={css.starIcon}>
                <use href="/sprite.svg#icon-star" />
              </svg>
              <span className={css.ratingText}>
                {camper.rating} ({camper.reviews?.length || 0} Reviews)
              </span>
            </div>
            <div className={css.location}>
              <svg width={16} height={16} className={css.icon}>
                <use href="/sprite.svg#icon-map" />
              </svg>
              <span>{camper.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className={css.description}>{camper.description}</p>

          {/* Features */}
          <div className={css.features}>
            {features.slice(0, 5).map((feature, index) => (
              <span key={index} className={css.feature}>
                <svg width={20} height={20} className={css.featureIcon}>
                  <use href={`/sprite.svg#icon-${feature.icon}`} />
                </svg>
                {feature.label}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className={css.actions}>
            <Link href={`/catalog/${camper.id}`}>
              <Button variant="primary">Show more</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
