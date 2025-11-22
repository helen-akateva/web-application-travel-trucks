import { InputHTMLAttributes } from 'react';
import css from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({ label, error, className, ...props }: InputProps) {
    return (
        <div className={css.wrapper}>
            {label && <label className={css.label}>{label}</label>}
            <input
                className={`${css.input} ${error ? css.error : ''} ${className || ''}`}
                {...props}
            />
            {error && <span className={css.errorText}>{error}</span>}
        </div>
    );
}