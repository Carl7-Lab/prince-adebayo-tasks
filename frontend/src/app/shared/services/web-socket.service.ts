import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '@/environments/environment';
import { ToastService } from './toast.service';
import { SoundService } from './sound.service';

export interface WebSocketMessage {
  type: string;
  data: any;
}

export interface GreatResetNotification {
  type: 'great_reset';
  data: {
    action: 'reset_only' | 'reset_and_optimize';
    message: string;
    timestamp: string;
    status: string;
    minute: number;
  };
}

export interface ConnectionNotification {
  type: 'connection';
  data: {
    message: string;
    clientId: string;
    timestamp: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket | null = null;
  private connectionStatus$ = new BehaviorSubject<boolean>(false);
  private messages$ = new Subject<WebSocketMessage>();
  private greatReset$ = new Subject<GreatResetNotification>();
  toastService = inject(ToastService);
  soundService = inject(SoundService);

  constructor() {
    this.initializeConnection();
  }

  private initializeConnection(): void {
    const socketUrl = environment.apiUrl.replace('/api/v1', '');

    this.socket = io(`${socketUrl}/royal-todo`, {
      transports: ['websocket'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('🔗 Connected to Royal To-Do WebSocket');
      this.connectionStatus$.next(true);
    });

    this.socket.on('disconnect', () => {
      console.log('🔌 Disconnected from Royal To-Do WebSocket');
      this.connectionStatus$.next(false);
    });

    this.socket.on('connect_error', (error: Error) => {
      console.error('❌ WebSocket connection error:', error);
      this.connectionStatus$.next(false);
    });

    this.socket.on('connection', (data: ConnectionNotification) => {
      console.log('👑 Royal Welcome:', data);
      this.messages$.next(data);
    });

    this.socket.on('great_reset', (data: GreatResetNotification) => {
      console.log('🔄 Great Reset Notification:', data);
      this.greatReset$.next(data);
      this.messages$.next(data);
    });

    this.socket.on('great_reset_error', (data: WebSocketMessage) => {
      console.error('❌ Great Reset Error:', data);
      this.messages$.next(data);
    });

    this.socket.on('message_response', (data: WebSocketMessage) => {
      console.log('📨 Message Response:', data);
      this.messages$.next(data);
    });
  }

  sendMessage(message: { type: string; data?: any }): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit('message', message);
    } else {
      console.warn('⚠️ WebSocket not connected. Cannot send message.');
    }
  }

  getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus$.asObservable();
  }

  getMessages(): Observable<WebSocketMessage> {
    return this.messages$.asObservable();
  }

  getGreatResetNotifications(): Observable<GreatResetNotification> {
    console.log('🔄 Great Reset Notifications:', this.greatReset$.asObservable());

    this.greatReset$.asObservable().subscribe((notification) => {
      const { action, message, minute } = notification.data;

      this.soundService.playGreatResetSound(action);

      if (action === 'reset_and_optimize') {
        this.toastService.showAlert(
          '🔥 GREAT RESET - ROYAL REFRESH',
          `Minute ${minute} is PRIME! ${message}`,
          8000
        );
      } else {
        this.toastService.showSuccess('🔄 Great Reset', message, 5000);
      }
    });

    return this.greatReset$.asObservable();
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  connect(): void {
    if (this.socket && !this.socket.connected) {
      this.socket.connect();
    }
  }

  disconnect(): void {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }

  closeConnection(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}
