import type { InputHTMLAttributes, ReactNode } from 'react';
import { InputField } from './InputField';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  prefix?: string;
  suffix?: string;
  badge?: string;
  hint?: ReactNode;
  placeholder?: string;
  type?: 'text' | 'number';
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];
  maxLength?: number;
  disabled?: boolean;
  id?: string;
}

export function FormField({
  label,
  value,
  onChange,
  onBlur,
  error,
  prefix,
  suffix,
  badge,
  hint,
  placeholder,
  type = 'text',
  inputMode = 'numeric',
  maxLength,
  disabled = false,
  id,
}: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <InputField
      label={label}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      error={error}
      prefix={prefix}
      suffix={suffix}
      badge={badge}
      hint={hint}
      placeholder={placeholder}
      type={type}
      inputMode={inputMode}
      maxLength={maxLength}
      disabled={disabled}
      id={id}
      autoComplete="off"
    />
  );
}
