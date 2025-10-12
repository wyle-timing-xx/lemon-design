import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { cn } from '../utils';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'color' | 'size'> {
  /**
   * 按钮变体
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /**
   * 按钮大小
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * 是否加载中
   */
  loading?: boolean;
  /**
   * 加载中显示的文本
   */
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    loadingText = '加载中...',
    children,
    disabled,
    ...props 
  }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'primary':
          return 'lemon-button lemon-button-primary';
        case 'secondary':
          return 'lemon-button lemon-button-secondary';
        case 'outline':
          return 'lemon-button lemon-button-outline';
        case 'ghost':
          return 'lemon-button hover:bg-gray-100 text-gray-700';
        default:
          return 'lemon-button lemon-button-primary';
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case 'sm':
          return 'h-8 px-3 text-xs';
        case 'md':
          return 'h-10 px-4 py-2';
        case 'lg':
          return 'h-12 px-6 text-base';
        default:
          return 'h-10 px-4 py-2';
      }
    };

    return (
      <MuiButton
        ref={ref}
        className={cn(
          getVariantClasses(),
          getSizeClasses(),
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {loadingText}
          </div>
        ) : (
          children
        )}
      </MuiButton>
    );
  }
);

Button.displayName = 'Button';

export { Button };
