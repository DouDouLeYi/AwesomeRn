/**
 * @format
 */

// toast 图标类型定义
export type ToastIcon = 'success' | 'warning' | 'error' | 'info';

// toast 消息类型定义
export type ToastMessage = string[] | string;

// toast 消息位置类型定义
export type ToastPosition = 'center' | 'top' | 'bottom';

export interface ToastProps {
    icon: ToastIcon;
    position:ToastPosition,
    message: ToastMessage;
}
