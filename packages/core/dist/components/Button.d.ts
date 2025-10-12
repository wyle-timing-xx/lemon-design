import React from 'react';
import { ButtonProps as MuiButtonProps } from '@mui/material';
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
declare const Button: React.ForwardRefExoticComponent<Omit<ButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { Button };
//# sourceMappingURL=Button.d.ts.map