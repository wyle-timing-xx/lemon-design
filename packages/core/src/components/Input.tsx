import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { cn } from '../utils';

export interface InputProps extends Omit<TextFieldProps, 'variant' | 'size'> {
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

    return (
      <div className="w-full">
        <TextField
          ref={ref}
          className={cn(
            'w-full',
            getSizeClasses(),
            className
          )}
          variant={variant}
          size={size === 'sm' ? 'small' : size === 'lg' ? 'medium' : 'medium'}
          label={label}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          error={error}
          helperText={error ? errorMessage : helperText}
          InputProps={{
            className: cn(
              'lemon-input',
              error && 'border-red-500 focus-visible:ring-red-500',
              disabled && 'opacity-50 cursor-not-allowed'
            ),
          }}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
