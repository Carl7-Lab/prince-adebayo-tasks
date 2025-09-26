import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EventModule } from '../event/event.module';

@Module({
  imports: [PrismaModule, EventModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
