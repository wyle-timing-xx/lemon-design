import React from 'react';
import { ClassValue } from 'clsx';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
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

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
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
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

/**
 * 合并类名的工具函数
 * @param inputs 类名数组
 * @returns 合并后的类名字符串
 */
declare function cn(...inputs: ClassValue[]): string;
/**
 * 生成随机 ID
 * @param prefix 前缀
 * @returns 随机 ID
 */
declare function generateId(prefix?: string): string;
/**
 * 深度合并对象
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的对象
 */
declare function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T;

export { Button, Card, Input, cn, deepMerge, generateId };
export type { ButtonProps, CardProps, InputProps };
