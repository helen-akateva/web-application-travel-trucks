export function formatPrice(price: number): string {
  return price.toFixed(2);
}

export function getStarRating(rating: number): boolean[] {
  return Array.from({ length: 5 }, (_, i) => i < rating);
}
