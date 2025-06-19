'use client';

import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  type?:
    | 'text'
    | 'email'
    | 'tel'
    | 'password'
    | 'number'
    | 'date'
    | 'time'
    | 'url';
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  disabled?: boolean;
  className?: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  disabled?: boolean;
  className?: string;
}

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

interface FormButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

// Form Field Component
export function FormField({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helpText,
  disabled = false,
  className = '',
}: FormFieldProps) {
  const baseInputStyles = `
    w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 
    focus:ring-2 focus:ring-terracotta-300 focus:border-terracotta-500 focus:outline-none
    disabled:bg-charcoal-50 disabled:cursor-not-allowed disabled:text-charcoal-400
  `;

  const errorStyles = error
    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
    : 'border-sage-200 focus:border-terracotta-500';

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-semibold text-charcoal-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`${baseInputStyles} ${errorStyles}`}
      />

      {error && (
        <p className="text-red-500 text-sm flex items-center">
          <svg
            className="w-4 h-4 mr-1 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      )}

      {helpText && !error && (
        <p className="text-charcoal-500 text-sm">{helpText}</p>
      )}
    </div>
  );
}

// Form Select Component
export function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  error,
  helpText,
  disabled = false,
  className = '',
}: FormSelectProps) {
  const baseSelectStyles = `
    w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 
    focus:ring-2 focus:ring-terracotta-300 focus:border-terracotta-500 focus:outline-none
    disabled:bg-charcoal-50 disabled:cursor-not-allowed disabled:text-charcoal-400
    appearance-none bg-white
  `;

  const errorStyles = error
    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
    : 'border-sage-200 focus:border-terracotta-500';

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-semibold text-charcoal-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className={`${baseSelectStyles} ${errorStyles}`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-charcoal-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm flex items-center">
          <svg
            className="w-4 h-4 mr-1 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      )}

      {helpText && !error && (
        <p className="text-charcoal-500 text-sm">{helpText}</p>
      )}
    </div>
  );
}

// Form Textarea Component
export function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helpText,
  disabled = false,
  rows = 4,
  className = '',
}: FormTextareaProps) {
  const baseTextareaStyles = `
    w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 resize-none
    focus:ring-2 focus:ring-terracotta-300 focus:border-terracotta-500 focus:outline-none
    disabled:bg-charcoal-50 disabled:cursor-not-allowed disabled:text-charcoal-400
  `;

  const errorStyles = error
    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
    : 'border-sage-200 focus:border-terracotta-500';

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-semibold text-charcoal-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`${baseTextareaStyles} ${errorStyles}`}
      />

      {error && (
        <p className="text-red-500 text-sm flex items-center">
          <svg
            className="w-4 h-4 mr-1 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      )}

      {helpText && !error && (
        <p className="text-charcoal-500 text-sm">{helpText}</p>
      )}
    </div>
  );
}

// Form Button Component
export function FormButton({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
}: FormButtonProps) {
  const baseStyles =
    'font-body font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center';

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary:
      'bg-terracotta-500 hover:bg-terracotta-600 text-white shadow-md hover:shadow-lg disabled:bg-charcoal-300',
    secondary:
      'bg-sage-500 hover:bg-sage-600 text-white shadow-md hover:shadow-lg disabled:bg-charcoal-300',
    outline:
      'border-2 border-terracotta-500 text-terracotta-600 hover:bg-terracotta-500 hover:text-white disabled:border-charcoal-300 disabled:text-charcoal-400',
    ghost:
      'text-terracotta-600 hover:bg-terracotta-50 disabled:text-charcoal-400',
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${className}
      `}
    >
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
      )}
      {children}
    </button>
  );
}

// Form Group Component for layout
interface FormGroupProps {
  children: ReactNode;
  className?: string;
}

export function FormGroup({ children, className = '' }: FormGroupProps) {
  return <div className={`space-y-6 ${className}`}>{children}</div>;
}

// Form Row Component for side-by-side fields
interface FormRowProps {
  children: ReactNode;
  className?: string;
}

export function FormRow({ children, className = '' }: FormRowProps) {
  return (
    <div className={`grid md:grid-cols-2 gap-6 ${className}`}>{children}</div>
  );
}
