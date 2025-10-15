import React from 'react';
import { cn } from '../utils';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 输入框变体
   */
  variant?: 'outlined' | 'filled' | 'standard';
  /**
   * 输入框大小
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * 是否显示错误状态
   */
  error?: boolean;
  /**
   * 错误信息
   */
  errorMessage?: string;
  /**
   * 帮助文本
   */
  helperText?: string;
  /**
   * 标签文本
   */
  label?: string;
  /**
   * 占位符文本
   */
  placeholder?: string;
  /**
   * 是否必填
   */
  required?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 多行文本（渲染为 textarea）
   */
  multiline?: boolean;
  /**
   * textarea 行数（仅 multiline 为 true 时生效）
   */
  rows?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant = 'outlined',
    size = 'md',
    error = false,
    errorMessage,
    helperText,
    label,
    placeholder,
    required = false,
    disabled = false,
    multiline = false,
    rows,
    ...props 
  }, ref) => {
    const getSizeClasses = () => {
      switch (size) {
        case 'sm':
          return 'h-8 text-sm';
        case 'md':
          return 'h-10 text-sm';
        case 'lg':
          return 'h-12 text-base';
        default:
          return 'h-10 text-sm';
      }
    };

    const getVariantClasses = () => {
      switch (variant) {
        case 'filled':
          return 'bg-gray-50';
        case 'standard':
          return 'border-0 border-b border-gray-300 rounded-none';
        case 'outlined':
        default:
          return '';
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}
        {multiline ? (
          <textarea
            ref={ref as unknown as React.Ref<HTMLTextAreaElement>}
            className={cn(
              'lemon-input',
              getSizeClasses(),
              getVariantClasses(),
              error && 'border-red-500 focus-visible:ring-red-500',
              disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={rows}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref}
            className={cn(
              'lemon-input',
              getSizeClasses(),
              getVariantClasses(),
              error && 'border-red-500 focus-visible:ring-red-500',
              disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            {...props}
          />
        )}
        {error ? (
          errorMessage && <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
        ) : (
          helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
