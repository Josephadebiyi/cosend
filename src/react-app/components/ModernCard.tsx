import { ReactNode } from 'react';

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function ModernCard({ 
  children, 
  className = '', 
  padding = 'md',
  hover = false,
  onClick,
  variant = 'primary'
}: ModernCardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const hoverClass = hover ? 'hover:shadow-elevated hover:-translate-y-1 cursor-pointer' : '';
  const cardClass = variant === 'secondary' ? 'card-secondary' : 'card';
  
  return (
    <div 
      className={`${cardClass} ${paddingClasses[padding]} ${hoverClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
