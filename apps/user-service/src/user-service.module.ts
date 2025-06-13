import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from '@app/database'; // adjust based on tsconfig paths
import { User } from '@app/database/src/models/user.model'; // import your model

import { UserService } from './user-service.service';
import { UserServiceController } from './user-service.controller';

@Module({
  imports: [DatabaseModule, SequelizeModule.forFeature([User])],
  controllers: [UserServiceController],
  providers: [UserService],
})
export class UserServiceModule {}
