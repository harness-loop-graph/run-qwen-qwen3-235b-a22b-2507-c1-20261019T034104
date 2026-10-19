import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login(email: string, password: string) {
    // TODO: Implement login with JWT
    return { message: 'Login successful' };
  }

  async register(email: string, password: string) {
    // TODO: Implement user registration
    return { message: 'User registered' };
  }
}