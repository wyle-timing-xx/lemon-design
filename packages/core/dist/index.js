'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

/**
 * 合并类名的工具函数
 * @param inputs 类名数组
 * @returns 合并后的类名字符串
 */
function cn(...inputs) {
    return clsx(inputs);
}
/**
 * 生成随机 ID
 * @param prefix 前缀
 * @returns 随机 ID
 */
function generateId(prefix = 'lemon') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}
/**
 * 深度合并对象
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的对象
 */
function deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(result[key] || {}, source[key]);
        }
        else {
            result[key] = source[key];
        }
    }
    return result;
}

const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', loading = false, loadingText = '加载中...', children, disabled, ...props }, ref) => {
    const getVariantClasses = () => {
        switch (variant) {
            case 'primary':
                return 'lemon-button lemon-button-primary';
            case 'secondary':
                return 'lemon-button lemon-button-secondary';
            case 'outline':
                return 'lemon-button lemon-button-outline';
            case 'ghost':
                return 'lemon-button lemon-button-ghost';
            case 'success':
                return 'lemon-button lemon-button-success';
            case 'warning':
                return 'lemon-button lemon-button-warning';
            case 'error':
                return 'lemon-button lemon-button-error';
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
    return (jsxRuntime.jsx("button", { ref: ref, className: cn(getVariantClasses(), getSizeClasses(), className), disabled: disabled || loading, ...props, children: loading ? (jsxRuntime.jsxs("div", { className: "flex items-center", children: [jsxRuntime.jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [jsxRuntime.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), jsxRuntime.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), loadingText] })) : (children) }));
});
Button.displayName = 'Button';

const Card = React.forwardRef(({ className, title, subtitle, actions, bordered = true, shadow = true, children, ...props }, ref) => {
    return (jsxRuntime.jsxs("div", { ref: ref, className: cn('lemon-card', bordered ? 'border' : 'border-0', shadow ? 'shadow-sm' : 'shadow-none', className), ...props, children: [(title || subtitle || actions) && (jsxRuntime.jsx("div", { className: "p-4 border-b border-gray-200", children: jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [jsxRuntime.jsxs("div", { children: [title && (jsxRuntime.jsx("h3", { className: "text-lg font-semibold text-gray-900", children: title })), subtitle && (jsxRuntime.jsx("p", { className: "text-sm text-gray-500 mt-1", children: subtitle }))] }), actions && (jsxRuntime.jsx("div", { className: "flex items-center space-x-2", children: actions }))] }) })), jsxRuntime.jsx("div", { className: "p-4", children: children })] }));
});
Card.displayName = 'Card';

const Input = React.forwardRef(({ className, variant = 'outlined', size = 'md', error = false, errorMessage, helperText, label, placeholder, required = false, disabled = false, multiline = false, rows, ...props }, ref) => {
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
    return (jsxRuntime.jsxs("div", { className: "w-full", children: [label && (jsxRuntime.jsxs("label", { className: "block mb-1 text-sm font-medium text-gray-700", children: [label, required && jsxRuntime.jsx("span", { className: "text-red-500", children: " *" })] })), multiline ? (jsxRuntime.jsx("textarea", { ref: ref, className: cn('lemon-input', getSizeClasses(), getVariantClasses(), error && 'border-red-500 focus-visible:ring-red-500', disabled && 'opacity-50 cursor-not-allowed', className), placeholder: placeholder, required: required, disabled: disabled, rows: rows, ...props })) : (jsxRuntime.jsx("input", { ref: ref, className: cn('lemon-input', getSizeClasses(), getVariantClasses(), error && 'border-red-500 focus-visible:ring-red-500', disabled && 'opacity-50 cursor-not-allowed', className), placeholder: placeholder, required: required, disabled: disabled, ...props })), error ? (errorMessage && jsxRuntime.jsx("p", { className: "mt-1 text-xs text-red-600", children: errorMessage })) : (helperText && jsxRuntime.jsx("p", { className: "mt-1 text-xs text-gray-500", children: helperText }))] }));
});
Input.displayName = 'Input';

exports.Button = Button;
exports.Card = Card;
exports.Input = Input;
exports.cn = cn;
exports.deepMerge = deepMerge;
exports.generateId = generateId;
//# sourceMappingURL=index.js.map
