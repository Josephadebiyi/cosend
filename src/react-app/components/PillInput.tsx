import { LucideIcon } from 'lucide-react';

interface PillInputProps {
  icon: LucideIcon;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'tel' | 'date' | 'number' | 'time';
  disabled?: boolean;
  className?: string;
  inputMode?: 'search' | 'text' | 'email' | 'tel' | 'url' | 'none' | 'numeric' | 'decimal';
}

export default function PillInput({
  icon: Icon,
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false,
  className = '',
  inputMode,
}: PillInputProps) {
  return (
    <div className={`pill-input-container ${className}`}>
      <Icon className="pill-input-icon" size={20} />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        inputMode={inputMode}
        className="pill-input w-full"
      />
    </div>
  );
}
