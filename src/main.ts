import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function setupMiddleware(app: INestApplication) {
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true
    })
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupMiddleware(app);

  const config = new DocumentBuilder()
    .setTitle('Whisky Logger App')
    .setDescription('An API for discovering whisky and logging reviews')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
