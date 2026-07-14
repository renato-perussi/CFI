import { InputField } from './InputField';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  type?: 'text' | 'number';
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
  placeholder,
  type = 'text',
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
      placeholder={placeholder}
      type={type}
      maxLength={maxLength}
      disabled={disabled}
      id={id}
      autoComplete="off"
    />
  );
}
