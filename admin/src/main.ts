import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // this project ADMIN push event to listen project MAIN at 80001

  // ADMIN is sender && MAIN is listening
  // MAIN -> HTTP send to ADMIN

  await app.listen(8000);
}
bootstrap();
