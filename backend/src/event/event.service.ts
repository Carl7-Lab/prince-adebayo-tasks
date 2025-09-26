import { Injectable, Logger } from '@nestjs/common';

interface ResetResult {
  status: string;
  action: string;
  message: string;
}

interface WebSocketNotification {
  type: string;
  data: {
    action: string;
    message: string;
    timestamp: string;
    status: string;
    minute: number;
  };
}

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);

  constructor() {}

  processGreatResetResult(resetResult: ResetResult): WebSocketNotification {
    const now = new Date();

    return {
      type: 'great_reset',
      data: {
        action: resetResult.action,
        message: resetResult.message,
        timestamp: now.toISOString(),
        status: resetResult.status,
        minute: new Date().getMinutes(),
      },
    };
  }
}
