import {
  Controller,
  Post,
  Body,
  Inject,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IsEmail, IsNotEmpty } from 'class-validator';

// DTO with validation
class LoginDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() body: LoginDto) {
    try {
      const response$ = this.authClient.send({ cmd: 'login_user' }, body);
      const result = await lastValueFrom(response$);

      if (!result || result.success === false) {
        throw new HttpException(
          result?.message || 'Unauthorized',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return {
        success: true,
        message: 'Login successful',
        data: result.data || result,
      };
    } catch (err: any) {
      console.error('Microservice login error:', err?.message || err);

      throw new HttpException(
        err?.message || 'Internal server error',
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
