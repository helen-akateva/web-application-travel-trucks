import { ButtonHTMLAttributes, ReactNode } from 'react';
import css from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    isLoading?: boolean;
    children: ReactNode;
}

export default function Button({
    variant = 'primary',
    isLoading = false,
    children,
    className,
    disabled,
    ...props
}: ButtonProps) {
    const buttonClass = `${css.button} ${css[variant]} ${className || ''}`;

    return (
        <button
            className={buttonClass}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    );
}