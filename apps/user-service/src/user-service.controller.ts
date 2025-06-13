import { Controller, Get } from '@nestjs/common';
import { UserService } from './user-service.service';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserService) {}

  @Get()
  getHello(): string {
    return this.userServiceService.getHello();
  }
}
