'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useMemo, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { submitBooking, type BookingFormState } from '@/lib/actions/bookingActions';

import styles from './BookingForm.module.css';
import Button from '../Ui/Button';
import Input from '../Ui/Input';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" variant="primary" isLoading={pending} className={styles.submitButton}>
            Send
        </Button>
    );
}

const initialState: BookingFormState = {
    success: false,
};

export default function BookingForm() {
    const [state, formAction] = useFormState(submitBooking, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    // Calculate min and max dates
    const { minDate, maxDate } = useMemo(() => {
        const today = new Date();
        const min = today.toISOString().split('T')[0]; // Today in YYYY-MM-DD format

        // 6 months from today
        const sixMonthsLater = new Date(today);
        sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
        const max = sixMonthsLater.toISOString().split('T')[0];

        return { minDate: min, maxDate: max };
    }, []);

    // Handle success state
    useEffect(() => {
        if (state.success && state.message) {
            toast.success(state.message);
            formRef.current?.reset();
        }
    }, [state.success, state.message]);

    return (
        <div className={styles.form}>
            <h3 className={styles.title}>Book your campervan now</h3>
            <p className={styles.subtitle}>
                Stay connected! We are always ready to help you.
            </p>

            <form ref={formRef} action={formAction} className={styles.fields}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Name*"
                    error={state.errors?.name}
                />

                <Input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    error={state.errors?.email}
                />

                <Input
                    type="date"
                    name="bookingDate"
                    placeholder="Booking date*"
                    min={minDate}
                    max={maxDate}
                    error={state.errors?.bookingDate}
                />

                <textarea
                    name="comment"
                    placeholder="Comment"
                    className={styles.textarea}
                />

                <SubmitButton />
            </form>
        </div>
    );
}