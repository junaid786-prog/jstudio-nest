import { NestFactory } from '@nestjs/core';
import { ProcessingServiceModule } from './processing-service.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ProcessingServiceModule, {
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  })
  await app.listen();
}

bootstrap();
