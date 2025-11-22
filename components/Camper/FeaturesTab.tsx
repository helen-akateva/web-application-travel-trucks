import type { Camper } from '@/types/camper';
import css from './FeaturesTab.module.css';

interface FeaturesTabProps {
    camper: Camper;
}

// Icon mapping for features
const FEATURE_ICON_MAP: Record<string, string> = {
    transmission: 'automatic',
    automatic: 'automatic',
    manual: 'automatic',
    engine: 'petrol',
    petrol: 'petrol',
    diesel: 'petrol',
    AC: 'ac',
    bathroom: 'shower',
    kitchen: 'kitchen',
    TV: 'tv',
    radio: 'radio',
    refrigerator: 'refrigerator',
    microwave: 'microwave',
    gas: 'gas',
    water: 'water',
};

export default function FeaturesTab({ camper }: FeaturesTabProps) {
    // Characteristics to display
    const characteristics = [
        { key: 'transmission', value: camper.transmission, icon: 'automatic' },
        { key: 'engine', value: camper.engine, icon: 'petrol' },
        { key: 'AC', value: camper.AC ? 'AC' : null, icon: 'ac' },
        { key: 'bathroom', value: camper.bathroom ? 'Bathroom' : null, icon: 'shower' },
        { key: 'kitchen', value: camper.kitchen ? 'Kitchen' : null, icon: 'kitchen' },
        { key: 'TV', value: camper.TV ? 'TV' : null, icon: 'tv' },
        { key: 'radio', value: camper.radio ? 'Radio' : null, icon: 'radio' },
    ].filter((item) => item.value);

    // Details to display
    const details = [
        { key: 'form', label: 'Form', value: camper.form },
        { key: 'length', label: 'Length', value: camper.length },
        { key: 'width', label: 'Width', value: camper.width },
        { key: 'height', label: 'Height', value: camper.height },
        { key: 'tank', label: 'Tank', value: camper.tank },
        { key: 'consumption', label: 'Consumption', value: camper.consumption },
    ].filter((item) => item.value);

    return (
        <div className={css.container}>
            {/* Characteristics */}
            <div className={css.features}>
                {characteristics.map((item) => (
                    <div key={item.key} className={css.feature}>
                        <svg width={20} height={20} className={css.featureIcon}>
                            <use href={`/sprite.svg#icon-${item.icon}`} />
                        </svg>
                        <span>
                            {typeof item.value === 'string' ? item.value : item.value ? item.key : ''}
                        </span>
                    </div>
                ))}
            </div>

            {/* Vehicle Details */}
            <div className={css.details}>
                <h3 className={css.detailsTitle}>Vehicle details</h3>
                <div className={css.detailsList}>
                    {details.map((item) => (
                        <div key={item.key} className={css.detailItem}>
                            <span className={css.detailLabel}>{item.label}</span>
                            <span className={css.detailValue}>{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}