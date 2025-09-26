import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../constants/navigation-paths';
import { WebSocketService } from '../../services/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnDestroy {
  webSocketService = inject(WebSocketService);

  private subscriptions = new Subscription();
  private connectionStatus = signal<boolean>(false);

  notes_list = FULL_NAVIGATION_PATHS.NOTES_LIST;
  note_create = FULL_NAVIGATION_PATHS.NOTES_CREATE;

  isConnected = computed(() => this.connectionStatus());
  connectionIcon = computed(() => (this.isConnected() ? '👑' : '🔌'));

  connectionIndicatorClasses = computed(() =>
    this.isConnected()
      ? 'connected bg-green-500/20 border border-green-400/50'
      : 'disconnected bg-red-500/20 border border-red-400/50'
  );

  connectionIconClasses = computed(() => (this.isConnected() ? 'connected' : 'disconnected'));

  ngOnInit() {
    this.subscriptions.add(
      this.webSocketService.getConnectionStatus().subscribe((connected) => {
        this.connectionStatus.set(connected);
      })
    );

    this.subscriptions.add(
      this.webSocketService.getGreatResetNotifications().subscribe((notification) => {})
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
