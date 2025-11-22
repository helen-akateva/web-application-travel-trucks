import type { Review } from '@/types/camper';
import css from './ReviewsTab.module.css';

interface ReviewsTabProps {
    reviews: Review[];
}

export default function ReviewsTab({ reviews }: ReviewsTabProps) {
    if (!reviews || reviews.length === 0) {
        return (
            <div className={css.container}>
                <p className={css.emptyText}>No reviews yet.</p>
            </div>
        );
    }

    return (
        <div className={css.container}>
            {reviews.map((review, index) => (
                <div key={index} className={css.review}>
                    {/* Reviewer Info */}
                    <div className={css.header}>
                        {/* Avatar */}
                        <div className={css.avatar}>
                            {review.reviewer_name.charAt(0).toUpperCase()}
                        </div>
                        <div className={css.reviewerInfo}>
                            <h4 className={css.reviewerName}>{review.reviewer_name}</h4>
                            {/* Star Rating */}
                            <div className={css.rating}>
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        width={16}
                                        height={16}
                                        className={i < review.reviewer_rating ? css.star : css.starEmpty}
                                    >
                                        <use href="/sprite.svg#icon-star" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Comment */}
                    <p className={css.comment}>{review.comment}</p>
                </div>
            ))}
        </div>
    );
}