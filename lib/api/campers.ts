import axios from 'axios';
import { API_BASE_URL, ITEMS_PER_PAGE } from '../constants';
import type { Camper, FilterParams } from '@/types/camper';

// Створюємо екземпляр Axios для роботи з API
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Будує параметри запиту для фільтрації кемперів
 * 
 * Ця функція перетворює об'єкт фільтрів у формат, який розуміє MockAPI.
 * Наприклад: { location: "Kyiv", AC: true } => { page: 1, limit: 4, location: "Kyiv", AC: true }
 * 
 * @param filters - Об'єкт з фільтрами (локація, обладнання, тип кузова)
 * @param page - Номер сторінки для пагінації
 * @returns Об'єкт параметрів для API запиту
 */
function buildFilterParams(filters: FilterParams, page: number = 1) {
    const params: Record<string, string | number | boolean> = {
        page,
        limit: ITEMS_PER_PAGE, // Скільки елементів показувати на одній сторінці
    };

    // Додаємо фільтр за локацією, якщо він вказаний
    if (filters.location) {
        params.location = filters.location;
    }

    // Додаємо фільтр за типом кузова (panelTruck, fullyIntegrated, alcove)
    if (filters.form) {
        params.form = filters.form;
    }

    // Список всіх можливих фільтрів обладнання
    const equipmentKeys: (keyof FilterParams)[] = [
        'AC',
        'kitchen',
        'bathroom',
        'TV',
        'radio',
        'refrigerator',
        'microwave',
        'gas',
        'water',
    ];

    // Додаємо тільки ті фільтри обладнання, які вибрані (true)
    equipmentKeys.forEach((key) => {
        if (filters[key] === true) {
            params[key] = true;
        }
    });

    // Додаємо фільтр за типом трансмісії (automatic/manual)
    if (filters.transmission) {
        params.transmission = filters.transmission;
    }

    return params;
}

/**
 * Отримує список кемперів з сервера з фільтрацією та пагінацією
 * 
 * API повертає: { total: number, items: Camper[] }
 * - total: загальна кількість кемперів (для пагінації)
 * - items: масив кемперів на поточній сторінці
 * 
 * @param filters - Фільтри для пошуку
 * @param page - Номер сторінки
 * @returns Об'єкт з масивом кемперів та загальною кількістю
 */
export async function getCampers(
    filters: FilterParams = {},
    page: number = 1
): Promise<{ items: Camper[]; total: number }> {
    try {
        const params = buildFilterParams(filters, page);

        // Відправляємо GET запит до API
        const response = await api.get<{ total: number; items: Camper[] }>('/campers', { params });

        // Деструктуризуємо відповідь, встановлюємо значення за замовчуванням
        const { items = [], total = 0 } = response.data || {};

        // Додаткова перевірка, що items - це масив
        return { items: Array.isArray(items) ? items : [], total };
    } catch {
        // У разі помилки повертаємо порожній масив замість краху додатку
        return { items: [], total: 0 };
    }
}

/**
 * Отримує детальну інформацію про один кемпер за ID
 * 
 * @param id - ID кемпера
 * @returns Об'єкт кемпера з повною інформацією
 * @throws Помилка, якщо кемпер не знайдено
 */
export async function getCamperById(id: string): Promise<Camper> {
    try {
        const response = await api.get<Camper>(`/campers/${id}`);
        return response.data;
    } catch (error) {
        // Пробрасуємо помилку далі, щоб компонент міг її обробити
        throw error;
    }
}