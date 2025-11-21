'use client';

import { useEffect, useState } from 'react';
import { fetchCampers, formatPrice } from '@/lib/api/campers';
import { Camper } from '@/types/camper';
import Loading from '../loading';

export default function CatalogPage() {
  const [campers, setCampers] = useState<Camper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCampers = async () => {
      setLoading(true);
      try {
        const data = await fetchCampers();
        setCampers(data);
      } catch (error) {
        console.error('Error loading campers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCampers();
  }, []);

  if (loading) {
    return <div><Loading/></div> ;
  }

  return (
    <div>
      {campers.map((camper) => (
        <div key={camper.id}>
          <h2>{camper.name}</h2>
          <p>Price: €{formatPrice(camper.price)}</p>
        </div>
      ))}
    </div>
  );
}