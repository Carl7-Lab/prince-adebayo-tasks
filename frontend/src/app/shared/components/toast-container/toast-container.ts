import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastComponent } from '../toast/toast';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  imports: [ToastComponent],
  templateUrl: './toast-container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'toast-container-host',
  },
})
export class ToastContainerComponent {
  protected readonly toastService = inject(ToastService);

  getCloseHandler(id: string): () => void {
    return () => this.toastService.remove(id);
  }
}
