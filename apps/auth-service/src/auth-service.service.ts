import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'yes/database/models/users.model';
// import * as bcrypt from 'bcrypt'; // Uncomment for real password hashing

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('fj');
    const user = await this.userModel.findOne({ where: { email } });
    console.log(user, 'useruseruser');
    if (!user) {
      return { status: 'error', message: 'User not found' };
    }

    // Use plain text password comparison (for dev only)
    const isPasswordValid = password === user.password_hash;

    // Use this in production:

    // const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return { status: 'error', message: 'Invalid password' };
    }

    // In real app, return JWT here
    return {
      status: 'success',
      token: 'mock_token_123', // Replace with generated JWT token
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
