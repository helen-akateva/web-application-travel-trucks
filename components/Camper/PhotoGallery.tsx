'use client';

import Image from 'next/image';
import type { GalleryImage } from '@/types/camper';
import css from './PhotoGallery.module.css';

interface PhotoGalleryProps {
    images: GalleryImage[];
    name: string;
}

export default function PhotoGallery({ images, name }: PhotoGalleryProps) {
    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className={css.gallery}>
            {images.map((image, index) => (
                <div
                    key={index}
                    className={css.imageWrapper}
                >
                    <Image
                        src={image.original}
                        alt={`${name} - Image ${index + 1}`}
                        fill
                        className={css.image}
                    />
                </div>
            ))}
        </div>
    );
}