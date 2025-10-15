import React from 'react';
import { cn } from '../utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 卡片标题
   */
  title?: string;
  /**
   * 卡片副标题
   */
  subtitle?: string;
  /**
   * 卡片操作区域
   */
  actions?: React.ReactNode;
  /**
   * 是否显示边框
   */
  bordered?: boolean;
  /**
   * 是否显示阴影
   */
  shadow?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    title, 
    subtitle, 
    actions, 
    bordered = true,
    shadow = true,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'lemon-card',
          bordered ? 'border' : 'border-0',
          shadow ? 'shadow-sm' : 'shadow-none',
          className
        )}
        {...props}
      >
        {(title || subtitle || actions) && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                {title && (
                  <h3 className="text-lg font-semibold text-gray-900">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-sm text-gray-500 mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
              {actions && (
                <div className="flex items-center space-x-2">
                  {actions}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="p-4">
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
