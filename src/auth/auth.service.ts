import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private _prisma: PrismaService){}

  signup() {
    return { msg: 'I have sign up!' };
  }

  signin() {
    return { msg: 'I have sign in!' };
  }
}
