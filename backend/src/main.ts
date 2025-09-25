import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');

  app.setGlobalPrefix(process.env.API_PREFIX || 'api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('The Royal To-Do List API')
    .setDescription(
      'A prestigious digital task manager for His Royal Highness, Prince Adebayo of Nigeria. Manage royal decrees and tasks with sophisticated business logic including inauspicious date detection, palindrome curse handling, and automatic resets.',
    )
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Server is running on port: ${await app.getUrl()}/api`);
  logger.log(`Docs: ${await app.getUrl()}/docs`);
}
bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
