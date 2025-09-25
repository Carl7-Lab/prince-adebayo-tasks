import { Injectable, signal, computed } from '@angular/core';
import { ToastData, ToastType } from '../interfaces/toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts = signal<ToastData[]>([]);

  public readonly toastsList = computed(() => this.toasts());

  show(
    title: string,
    description: string,
    type: ToastType = 'alert',
    duration: number = 5000
  ): void {
    const id = this.generateId();
    const newToast: ToastData = {
      id,
      title,
      description,
      type,
      duration,
    };

    this.toasts.update((toasts) => [...toasts, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }
  }

  showSuccess(title: string, description: string, duration: number = 5000): void {
    this.show(title, description, 'success', duration);
  }

  showError(title: string, description: string, duration: number = 7000): void {
    this.show(title, description, 'error', duration);
  }

  showAlert(title: string, description: string, duration: number = 5000): void {
    this.show(title, description, 'alert', duration);
  }

  remove(id: string): void {
    this.toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }

  clear(): void {
    this.toasts.set([]);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
