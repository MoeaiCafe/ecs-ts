/**
 * 类（构造函数）
 */
export type Type = new (...args: any[]) => any;

/**
 * 带类型的构造函数
 */
export type Ctor<T extends object> = new (...args: any[]) => T;

/**
 * integer
 */
export type int = number;
