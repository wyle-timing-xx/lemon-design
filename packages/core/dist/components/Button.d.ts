import React from 'react';
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
    /**
     * 按钮变体
     */
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'error';
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
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button };
//# sourceMappingURL=Button.d.ts.map