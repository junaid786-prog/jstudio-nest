import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from '@app/shared';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    SharedModule,
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'auth-consumer',
          },
        }
      },
      {
        name: 'VIDEO_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
