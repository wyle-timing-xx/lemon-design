import React from 'react';
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
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export { Input };
//# sourceMappingURL=Input.d.ts.map