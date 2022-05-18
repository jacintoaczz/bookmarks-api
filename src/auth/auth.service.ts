import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';

import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable({})
export class AuthService {
  constructor(private _prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    try {
      // Generate the password hash
      const hash = await argon.hash(dto.password);
      // Save the user in the db
      const user = this._prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          firstName: true,
          lastName: true,
        },
      });

      // Return the saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('Credentials already taken.');
      }
    }
  }

  async signin(dto: AuthDto) {
    // Find the user by email
    const user = await this._prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Incorrect credentials.');

    // Compare passwords
    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException('Incorrect credentials.');

    delete user.hash;
    return user;
  }
}
