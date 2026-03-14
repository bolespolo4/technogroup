import React from 'react';

interface CardProps {
  variant?: 'product' | 'system' | 'project' | 'media';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ variant = 'product', children, className = '', onClick }: CardProps) {
  const base = 'rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl';
  const variants = {
    product: 'bg-white border border-slate-200 hover:border-primary-300 shadow-sm',
    system: 'bg-white border border-slate-200 hover:border-primary-300 shadow-md hover:-translate-y-1',
    project: 'bg-white shadow-lg hover:-translate-y-2',
    media: 'bg-white border border-slate-100 shadow-sm hover:shadow-lg',
  };
  return (
    <div className={`${base} ${variants[variant]} ${className} ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
      {children}
    </div>
  );
}
