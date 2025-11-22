'use server';

export type BookingFormState = {
    success: boolean;
    message?: string;
    errors?: {
        name?: string;
        email?: string;
        bookingDate?: string;
    };
};

export async function submitBooking(
    prevState: BookingFormState,
    formData: FormData
): Promise<BookingFormState> {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const bookingDate = formData.get('bookingDate') as string;
    const comment = formData.get('comment') as string;

    // Validation
    const errors: BookingFormState['errors'] = {};

    if (!name?.trim()) {
        errors.name = 'Name is required';
    }

    if (!email?.trim()) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Invalid email format';
    }

    if (!bookingDate) {
        errors.bookingDate = 'Booking date is required';
    } else {
        const selectedDate = new Date(bookingDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            errors.bookingDate = 'Cannot book for past dates';
        }

        const sixMonthsLater = new Date(today);
        sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

        if (selectedDate > sixMonthsLater) {
            errors.bookingDate = 'Cannot book more than 6 months in advance';
        }
    }

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            errors,
        };
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    

    return {
        success: true,
        message: 'Booking request sent successfully! We will contact you soon.',
    };
}