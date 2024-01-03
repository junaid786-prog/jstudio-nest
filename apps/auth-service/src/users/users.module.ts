import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/shared/lib/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...require('../../../../ormconfig.js'),
      entities: [User],
      retryAttempts: 2
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
