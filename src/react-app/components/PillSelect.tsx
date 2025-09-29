import { useState } from 'react';
import { LucideIcon, ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  flag?: string;
}

interface PillSelectProps {
  icon: LucideIcon;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  disabled?: boolean;
  className?: string;
}

export default function PillSelect({
  icon: Icon,
  placeholder,
  value,
  onChange,
  options,
  disabled = false,
  className = '',
}: PillSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`pill-input-container relative ${className}`}>
      <Icon className="pill-input-icon" size={20} />
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="pill-input w-full text-left"
      >
        <span className={selectedOption ? 'text-text-primary' : 'text-text-muted'}>
          {selectedOption ? (
            <span className="flex items-center">
              {selectedOption.flag && <span className="mr-2">{selectedOption.flag}</span>}
              {selectedOption.label}
            </span>
          ) : (
            placeholder
          )}
        </span>
      </button>
      <ChevronDown 
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`} 
      />

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-[60] w-full mt-2 bg-background-card border border-border-light rounded-2xl shadow-elevated max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleOptionSelect(option.value)}
                className="w-full px-4 py-3 text-left hover:bg-background-hover transition-colors first:rounded-t-2xl last:rounded-b-2xl flex items-center"
              >
                {option.flag && <span className="mr-3">{option.flag}</span>}
                <span className="text-text-primary">{option.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
