import React from 'react';

interface BadgeProps {
  variant?: 'system' | 'status' | 'cert';
  children: React.ReactNode;
  color?: string;
}

export function Badge({ variant = 'system', children, color }: BadgeProps) {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  const variants = {
    system: 'bg-primary-100 text-primary-700',
    status: 'bg-green-100 text-green-700',
    cert: 'bg-accent-100 text-accent-700',
  };
  const style = color ? { backgroundColor: `${color}20`, color } : {};
  return <span className={`${base} ${variants[variant]}`} style={style}>{children}</span>;
}
