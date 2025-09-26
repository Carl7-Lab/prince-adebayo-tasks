import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { NotesModule } from './notes/notes.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
import { ScheduleModule } from '@nestjs/schedule';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    NotesModule,
    EventModule,
  ],
})
export class AppModule {}
