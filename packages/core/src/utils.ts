import { clsx, type ClassValue } from 'clsx';

/**
 * 合并类名的工具函数
 * @param inputs 类名数组
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * 生成随机 ID
 * @param prefix 前缀
 * @returns 随机 ID
 */
export function generateId(prefix = 'lemon') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 深度合并对象
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的对象
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge((result[key] as any) || {}, source[key] as any);
    } else {
      result[key] = source[key] as any;
    }
  }
  
  return result;
}
