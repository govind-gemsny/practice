import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from 'yes/database/database.module'; // Adjust path as needed
import { User } from 'yes/database/models/users.model';
import { AuthService } from './auth-service.service';
import { AuthController } from './auth-service.controller';

@Module({
  imports: [DatabaseModule, SequelizeModule.forFeature([User])],
  providers: [AuthService],
  controllers: [AuthController], // <-- Make sure this is present
  exports: [AuthService],
})
export class AuthServiceModule {}
