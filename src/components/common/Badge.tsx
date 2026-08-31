import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'amber' | 'slate' | 'outline' | 'blue';
  className?: string;
  id?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'teal', 
  className = '',
  id
}) => {
  const variantStyles = {
    teal: 'bg-[#0F4C5C]/10 text-[#0F4C5C] border border-[#0F4C5C]/20',
    blue: 'bg-[#008CE8]/10 text-[#008CE8] border border-[#008CE8]/20 font-bold',
    amber: 'bg-[#D97706]/10 text-[#B45309] border border-[#D97706]/20',
    slate: 'bg-[#334155]/10 text-[#334155] border border-[#334155]/20',
    outline: 'bg-transparent text-[#0F4C5C] border border-[#0F4C5C]'
  };

  return (
    <span 
      id={id}
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md whitespace-nowrap ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
