// Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'primary'|'outline'|'ghost';
  size?: 'sm'|'md'|'lg';
  icon?: any;
}

export default function Button({ children, variant='primary', size='md', icon: Icon, ...rest }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium focus:outline-none';
  const sizes: Record<string,string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base'
  };
  const variants: Record<string,string> = {
    primary: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-50'
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]}`} {...rest}>
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
}
