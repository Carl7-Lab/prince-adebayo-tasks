import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { EventService } from './event.service';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

interface ResetResult {
  status: string;
  action: string;
  message: string;
}

interface ClientMessage {
  type: string;
  data?: any;
}

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  namespace: '/royal-todo',
})
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(EventGateway.name);

  constructor(private readonly eventService: EventService) {}

  handleConnection(client: Socket): void {
    this.logger.log(`Client connected: ${client.id}`);

    client.emit('connection', {
      type: 'connection',
      data: {
        message: 'Connected to Royal To-Do WebSocket',
        clientId: client.id,
        timestamp: new Date().toISOString(),
      },
    });
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  sendGreatResetNotification(resetResult: ResetResult): void {
    try {
      const notification =
        this.eventService.processGreatResetResult(resetResult);

      this.server.emit('great_reset', notification);

      this.logger.log(
        `Great Reset notification sent to all clients: ${resetResult.action}`,
      );
    } catch (error) {
      this.logger.error('Error sending Great Reset notification:', error);

      this.server.emit('great_reset_error', {
        type: 'error',
        data: {
          message: 'Error during Great Reset notification',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString(),
        },
      });
    }
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: ClientMessage): void {
    this.logger.log(`Message from ${client.id}: ${JSON.stringify(payload)}`);

    client.emit('message_response', {
      type: 'message_response',
      data: {
        originalMessage: payload,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
