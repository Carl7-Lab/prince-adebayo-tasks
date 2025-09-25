export type ToastType = 'success' | 'error' | 'alert';

export interface ToastData {
  id: string;
  title: string;
  description: string;
  type: ToastType;
  duration?: number;
}
