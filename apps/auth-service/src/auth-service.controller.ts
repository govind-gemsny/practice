import {
  Controller,
  UsePipes,
  ValidationPipe,
  UseFilters,
} from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { LoginDto } from '../../common/dto/login.dto';
import { AllRpcExceptionsFilter } from '../../common/filters/response.interface';
import { AuthService } from './auth-service.service';
import { ApiResponse } from '../../common/interfaces/response.interface';

@Controller()
@UseFilters(new AllRpcExceptionsFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login_user' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async loginUser(@Payload() data: LoginDto): Promise<ApiResponse<any>> {
    const result = await this.authService.validateUser(
      data.email,
      data.password,
    );

    if (result.status === 'error') {
      throw new RpcException(result.message);
    }

    return {
      success: true,
      message: 'Login successful',
      data: result,
    };
  }
}
