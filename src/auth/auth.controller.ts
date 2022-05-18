import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this._authService.signup();
  }

  @Post('signin')
  signin() {
    return this._authService.signin();
  }
}
