import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline-primary'
  | 'outline-danger'
  | 'danger';

export type ButtonSize = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus-visible:ring-blue-500',
  secondary:
    'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-slate-400',
  'outline-primary':
    'bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-400 focus-visible:ring-blue-500',
  'outline-danger':
    'bg-white text-red-600 border-red-200 hover:bg-red-50 hover:border-red-400 focus-visible:ring-red-500',
  danger:
    'bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 focus-visible:ring-red-500',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
