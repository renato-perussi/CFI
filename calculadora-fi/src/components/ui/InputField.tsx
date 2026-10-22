import type { InputHTMLAttributes, ReactNode, Ref } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  prefix?: string;
  suffix?: string;
  badge?: string;
  hint?: ReactNode;
  ref?: Ref<HTMLInputElement>;
}

export function InputField({
  label,
  error,
  prefix,
  suffix,
  badge,
  hint,
  className = '',
  id,
  ref,
  ...props
}: InputFieldProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const describedBy =
    [error && `${inputId}-error`, hint && `${inputId}-hint`].filter(Boolean).join(' ') || undefined;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700">
          {label}
        </label>
        {badge && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 tabular-nums">
            {badge}
          </span>
        )}
      </div>

      <div className="relative">
        {prefix && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm select-none pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-3.5 py-2.5 bg-slate-50/60 border rounded-xl text-base font-medium text-slate-900 tabular-nums
            placeholder:text-slate-400 placeholder:font-normal
            transition-all duration-150
            hover:border-slate-400 hover:bg-white
            focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600
            disabled:bg-slate-100 disabled:cursor-not-allowed
            ${prefix ? 'pl-11' : ''}
            ${suffix ? 'pr-10' : ''}
            ${
              error
                ? 'border-red-400 bg-red-50/30 focus:ring-red-500/20 focus:border-red-500'
                : 'border-slate-300'
            }
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm select-none pointer-events-none">
            {suffix}
          </span>
        )}
      </div>

      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1"
          role="alert"
        >
          <svg
            className="w-3.5 h-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </p>
      )}

      {hint && (
        <div id={`${inputId}-hint`} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </div>
      )}
    </div>
  );
}
