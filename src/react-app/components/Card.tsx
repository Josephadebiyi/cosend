import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ 
  children, 
  className = '', 
  padding = 'md',
  hover = false,
  onClick
}: CardProps) {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  const hoverClass = hover ? 'hover:shadow-primary hover:-translate-y-1 hover:bg-dark-surface' : '';
  
  return (
    <div 
      className={`bg-dark-card rounded-2xl shadow-dark border border-dark transition-all duration-300 ${paddingClasses[padding]} ${hoverClass} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
