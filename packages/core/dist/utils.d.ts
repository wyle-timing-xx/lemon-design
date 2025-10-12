import { type ClassValue } from 'clsx';
/**
 * 合并类名的工具函数
 * @param inputs 类名数组
 * @returns 合并后的类名字符串
 */
export declare function cn(...inputs: ClassValue[]): string;
/**
 * 生成随机 ID
 * @param prefix 前缀
 * @returns 随机 ID
 */
export declare function generateId(prefix?: string): string;
/**
 * 深度合并对象
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的对象
 */
export declare function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T;
//# sourceMappingURL=utils.d.ts.map