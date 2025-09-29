import { Shield, AlertTriangle } from 'lucide-react';
import ModernCard from './ModernCard';
import { PLATFORM_MESSAGE } from '@/shared/types';

interface PlatformMessageProps {
  variant?: 'info' | 'warning';
  showIcon?: boolean;
  className?: string;
}

export default function PlatformMessage({ 
  variant = 'info', 
  showIcon = true, 
  className = '' 
}: PlatformMessageProps) {
  const isWarning = variant === 'warning';
  
  return (
    <ModernCard className={`${
      isWarning 
        ? 'bg-warning/10 border-warning/20' 
        : 'bg-primary/10 border-primary/20'
    } ${className}`}>
      <div className="flex items-start">
        {showIcon && (
          <div className={`flex-shrink-0 mr-3 mt-0.5 ${
            isWarning ? 'text-warning' : 'text-primary'
          }`}>
            {isWarning ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <Shield className="w-5 h-5" />
            )}
          </div>
        )}
        <div className="flex-1">
          <div className={`font-semibold mb-2 ${
            isWarning ? 'text-warning' : 'text-primary'
          }`}>
            Platform Guidelines
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            {PLATFORM_MESSAGE}
          </p>
        </div>
      </div>
    </ModernCard>
  );
}
