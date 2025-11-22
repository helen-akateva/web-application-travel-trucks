'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './BookingForm.module.css';
import Button from '../Ui/Button';
import Input from '../Ui/Input';

export default function BookingForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleSubmit = async (formData: FormData) => {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;

        // Валідація
        if (!name?.trim()) {
            toast.error('Name is required');
            return;
        }

        if (!email?.trim()) {
            toast.error('Email is required');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error('Invalid email format');
            return;
        }

        if (!selectedDate) {
            toast.error('Booking date is required');
            return;
        }

        // Перевірка дати
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            toast.error('Cannot book for past dates');
            return;
        }

        const sixMonthsLater = new Date(today);
        sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

        if (selectedDate > sixMonthsLater) {
            toast.error('Cannot book more than 6 months in advance');
            return;
        }

        // Симуляція відправки
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSubmitting(false);

        toast.success('Booking request sent successfully! We will contact you soon.');

        // Скидання форми
        const form = document.querySelector('form') as HTMLFormElement;
        form?.reset();
        setSelectedDate(null);
    };

    // Мінімальна та максимальна дата
    const today = new Date();
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

    return (
        <div className={styles.form}>
            <h3 className={styles.title}>Book your campervan now</h3>
            <p className={styles.subtitle}>
                Stay connected! We are always ready to help you.
            </p>

            <form action={handleSubmit} className={styles.fields} noValidate>
                <Input type="text" name="name" placeholder="Name*" />
                <Input type="email" name="email" placeholder="Email*" />

                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    minDate={today}
                    maxDate={sixMonthsLater}
                    placeholderText="Booking date*"
                    dateFormat="dd.MM.yyyy"
                    className={styles.datePicker}
                />

                <textarea
                    name="comment"
                    placeholder="Comment"
                    className={styles.textarea}
                />
                <Button type="submit" variant="primary" isLoading={isSubmitting}>
                    Send
                </Button>
            </form>
        </div>
    );
}