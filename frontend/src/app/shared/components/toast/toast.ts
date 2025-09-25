import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastData } from '../../interfaces/toast.interface';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'toast-wrapper',
  },
})
export class ToastComponent {
  toastData = input.required<ToastData>();

  onClose = input.required<() => void>();
}
