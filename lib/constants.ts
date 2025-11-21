// ============================================
// API КОНФІГУРАЦІЯ
// ============================================

/**
 * API Base URL - використовуємо змінну оточення
 * Значення береться з .env файлу
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

// Кількість кемперів на одній сторінці каталогу
export const ITEMS_PER_PAGE = 4;

// ============================================
// ТИПИ КУЗОВІВ КЕМПЕРІВ
// ============================================

// Список доступних типів кузовів для фільтрації
// value - значення, яке відправляється на API
// label - текст, який бачить користувач
export const BODY_TYPES = [
    { value: 'panelTruck', label: 'Van' },
    { value: 'fullyIntegrated', label: 'Fully Integrated' },
    { value: 'alcove', label: 'Alcove' },
];

// ============================================
// ОПЦІЇ ОБЛАДНАННЯ ДЛЯ ФІЛЬТРІВ
// ============================================

// Список обладнання, яке можна вибрати у фільтрах
// Показуються тільки найпопулярніші опції для зручності користувача
export const EQUIPMENT_OPTIONS = [
    { key: 'AC' as const, label: 'AC' },
    { key: 'transmission' as const, label: 'Automatic', value: 'automatic' },
    { key: 'kitchen' as const, label: 'Kitchen' },
    { key: 'TV' as const, label: 'TV' },
    { key: 'bathroom' as const, label: 'Bathroom' },
];

// ============================================
// МІТКИ ДЛЯ ВІДОБРАЖЕННЯ ХАРАКТЕРИСТИК
// ============================================

// Словник для перекладу назв характеристик обладнання
// Використовується у FeaturesTab для відображення списку функцій
export const FEATURE_LABELS: Record<string, string> = {
    transmission: 'Transmission',
    engine: 'Engine',
    AC: 'AC',
    bathroom: 'Bathroom',
    kitchen: 'Kitchen',
    TV: 'TV',
    radio: 'Radio',
    refrigerator: 'Refrigerator',
    microwave: 'Microwave',
    gas: 'Gas',
    water: 'Water',
};

// Словник для перекладу назв технічних деталей
// Використовується у FeaturesTab для відображення деталей транспортного засобу
export const DETAIL_LABELS: Record<string, string> = {
    form: 'Form',
    length: 'Length',
    width: 'Width',
    height: 'Height',
    tank: 'Tank',
    consumption: 'Consumption',
};